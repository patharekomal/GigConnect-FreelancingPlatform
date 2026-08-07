package com.gigconnect.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.PaymentException;
import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.payment.CreateOrderRequestDto;
import com.gigconnect.dtos.payment.CreateOrderResponseDto;
import com.gigconnect.dtos.payment.FreelancerPaymentResponseDto;
import com.gigconnect.dtos.payment.PaymentFailedRequestDto;
import com.gigconnect.dtos.payment.PaymentResponseDto;
import com.gigconnect.entities.Client;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.Payment;
import com.gigconnect.entities.Project;
import com.gigconnect.enums.PaymentStatus;
import com.gigconnect.repository.ClientRepository;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.PaymentRepository;
import com.gigconnect.repository.ProjectRepository;
import com.gigconnect.security.SecurityUtil;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.gigconnect.dtos.payment.VerifyPaymentRequestDto;
import com.gigconnect.dtos.payment.VerifyPaymentResponseDto;
import com.gigconnect.enums.ProjectStatus;
import com.razorpay.Utils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;



@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	
	//Constructor based DI
	private final ProjectRepository projectRepository;
	private final PaymentRepository paymentRepository;
	private final SecurityUtil securityUtil; 
	private final AuthorizationService authorizationService;
	private final ClientRepository clientRepository;
	private final FreelancerRepository freelancerRepository;
	
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;
    

    @Override
    public CreateOrderResponseDto createOrder(CreateOrderRequestDto request) throws Exception {

    	Long userId = securityUtil.getCurrentUserId();
        // Fetch project
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new PaymentException("Project not found"));
        
        authorizationService.verifyProjectClient(project, userId);
        
        if (project.getStatus() != ProjectStatus.SUBMITTED) {
            throw new PaymentException(
                "Payment can only be made for submitted projects."
            );
        }
        
        Optional<Payment> existingPayment =
                paymentRepository.findByProjectId(project.getId());

        Payment payment;

        if (existingPayment.isPresent()) {

            payment = existingPayment.get();

            if (payment.getStatus() == PaymentStatus.SUCCESS) {
                throw new PaymentException("Payment already completed.");
            }

        } else {

            payment = new Payment();
            payment.setProject(project);

        }
        

        // Create Razorpay client
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

        // Amount in paise
        int amount = (int) Math.round(project.getAgreedAmount() * 100);

        // Create Razorpay order request
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + project.getId());

        // Create order
        Order order = razorpayClient.orders.create(orderRequest);

        // Save payment in database
        payment.setAmount(project.getAgreedAmount());
        payment.setRazorpayOrderId(order.get("id"));
        payment.setStatus(PaymentStatus.CREATED);

        paymentRepository.save(payment);

        // Return response
        return new CreateOrderResponseDto(
                order.get("id"),
                amount,
                "INR"
        );
    }
    
    @Override
    public VerifyPaymentResponseDto verifyPayment(VerifyPaymentRequestDto request) throws Exception {

    	Long userId = securityUtil.getCurrentUserId();
        // Create JSON object required for signature verification
        JSONObject attributes = new JSONObject();

        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());

        // Verify Razorpay signature
        boolean isValid = Utils.verifyPaymentSignature(attributes, keySecret);

        if (!isValid) {
            throw new RuntimeException("Invalid Payment Signature");
        }

        // Fetch payment from database
        Payment payment = paymentRepository
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new PaymentException("Payment not found"));
        

        authorizationService.verifyPaymentClient(payment, userId);
        
        // Update payment details
        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(PaymentStatus.SUCCESS);

        paymentRepository.save(payment);

        // Update project status
        Project project = payment.getProject();
        project.setStatus(ProjectStatus.COMPLETED);

        projectRepository.save(project);

        return new VerifyPaymentResponseDto(
                true,
                "Payment verified successfully"
        );
    }
    
    @Override
    public void markPaymentFailed(PaymentFailedRequestDto request) {

    	Long userId = securityUtil.getCurrentUserId();
        Payment payment = paymentRepository
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new PaymentException("Payment not found"));

        authorizationService.verifyPaymentClient(payment, userId);
        payment.setStatus(PaymentStatus.FAILED);

        paymentRepository.save(payment);
    }
    
    @Override
    public List<PaymentResponseDto> getPaymentsByClient() {

    	
    	Long userId = securityUtil.getCurrentUserId();

    	Client client = clientRepository
    	        .findByUserDetailsId(userId)
    	        .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        List<Payment> paymentList =
                paymentRepository.findByProjectClient(client);

        List<PaymentResponseDto> response = new ArrayList<>();

        for (Payment payment : paymentList) {

            PaymentResponseDto dto = new PaymentResponseDto();

            dto.setPaymentId(payment.getId());

            dto.setProjectTitle(payment.getProject().getJob().getTitle());

            dto.setAmount(payment.getAmount());

            dto.setStatus(payment.getStatus());

            dto.setPaymentDate(payment.getPaymentDate());

            response.add(dto);
        }

        return response;
    }

    @Override
    public List<FreelancerPaymentResponseDto> getPaymentsByFreelancer() {

        // Logged-in User
        Long userId = securityUtil.getCurrentUserId();

        // Find Freelancer
        Freelancer freelancer = freelancerRepository
                .findByUserDetailsId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Freelancer not found"));

        // Fetch Payments
        List<Payment> paymentList =
                paymentRepository.findByProjectFreelancerId(freelancer.getId());

        // Response List
        List<FreelancerPaymentResponseDto> response = new ArrayList<>();

        for (Payment payment : paymentList) {

            FreelancerPaymentResponseDto dto =
                    new FreelancerPaymentResponseDto();

            dto.setPaymentId(payment.getId());

            dto.setProjectTitle(
                    payment.getProject().getJob().getTitle());

            dto.setClientName(payment.getProject().getClient().getUserDetails().getFirstName()+ " "+ payment.getProject().getClient().getUserDetails().getLastName());

            dto.setAmount(payment.getAmount());

            dto.setStatus(payment.getStatus());

            dto.setPaymentDate(payment.getPaymentDate());

            response.add(dto);
        }

        return response;
    }
}