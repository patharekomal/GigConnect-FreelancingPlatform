package com.gigconnect.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.ClientResponse;
import com.gigconnect.dtos.client.ClientUpdateDto;
import com.gigconnect.entities.Client;
import com.gigconnect.entities.User;
import com.gigconnect.enums.UserRole;
import com.gigconnect.repository.ClientRepository;
import com.gigconnect.repository.JobRepository;
import com.gigconnect.repository.PaymentRepository;
import com.gigconnect.repository.ProjectRepository;
import com.gigconnect.repository.UserRepository;
import com.gigconnect.security.SecurityUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.gigconnect.dtos.client.ActivityResponseDto;
import com.gigconnect.dtos.client.ClientDashboardResponseDto;
import com.gigconnect.entities.Job;
import com.gigconnect.entities.Payment;
import com.gigconnect.entities.Project;
import com.gigconnect.enums.PaymentStatus;
import com.gigconnect.enums.ProjectStatus;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService{

	//Constructor based D.I.
	private final ClientRepository clientRepo;
	private final UserRepository userRepo;
	private final ModelMapper mapper;
	private final JobRepository jobRepository;

	private final ProjectRepository projectRepository;

	private final PaymentRepository paymentRepository;
	
	private final SecurityUtil securityUtil;
	
	
	
	@Override
	public ClientResponse fetchMyProfile() {
		Long userId = securityUtil.getCurrentUserId();
		//Find client
		Client client = clientRepo.findById(userId)
				.orElseThrow(()->
			       new ResourceNotFoundException("Invalid client Id :"+ userId));
		
		ClientResponse dto = 
				mapper.map(client, ClientResponse.class);
		
		//User details are stored in User entity
		dto.setFirstName(client.getUserDetails().getFirstName());
		dto.setLastName(client.getUserDetails().getLastName());
		dto.setEmail(client.getUserDetails().getEmail());
		dto.setPhone(client.getUserDetails().getPhone());
		//dto.setCompanyWebsite(client.getCompanyWebsite());
		
		return dto;
	}

	@Override
	public ApiResponse updateClientProfile(Long userId , ClientUpdateDto dto) {
		
		//Find Client
	    Client client = clientRepo.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Client not found"));
	    // Get associated User
	    User user = client.getUserDetails();

	    // Update User fields
	    if (dto.getFirstName() != null) {
	        user.setFirstName(dto.getFirstName());
	    }

	    if (dto.getLastName() != null) {
	        user.setLastName(dto.getLastName());
	    }

	    if (dto.getPhone() != null) {
	        user.setPhone(dto.getPhone());
	    }	
	    
	    mapper.map(dto, client);
	    return new ApiResponse("Success","Client profile updated successfully");
	}
	
	@Override
public ClientDashboardResponseDto getDashboard(Long clientId) {

    // Check Client
    clientRepo.findById(clientId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Client not found"));

    ClientDashboardResponseDto dto = new ClientDashboardResponseDto();

    // ----------------------------------------------------
    // Jobs Posted
    // ----------------------------------------------------
    dto.setJobsPosted(jobRepository.countByClientId(clientId));

    // ----------------------------------------------------
    // Active Projects
    // ----------------------------------------------------
    List<Project> projectList = projectRepository.findByClientId(clientId);

    long activeProjects = 0;

    for (Project project : projectList) {

        if (project.getStatus() == ProjectStatus.IN_PROGRESS) {
            activeProjects++;
        }
    }

    dto.setActiveProjects(activeProjects);

    // ----------------------------------------------------
    // Amount Released
    // ----------------------------------------------------
    List<Payment> paymentList =
            paymentRepository.findByProjectClientId(clientId);

    double amountReleased = 0;

    for (Payment payment : paymentList) {

        if (payment.getStatus() == PaymentStatus.SUCCESS) {

            amountReleased += payment.getAmount();

        }

    }

    dto.setAmountReleased(amountReleased);

    // ----------------------------------------------------
    // Recent Activity
    // ----------------------------------------------------

    List<ActivityResponseDto> activityList = new ArrayList<>();

    // Latest Jobs
    List<Job> jobs = jobRepository.findByClientId(clientId);

        for (Job job : jobs) {

        ActivityResponseDto activity =
            new ActivityResponseDto();

        activity.setMessage(
            "Job Posted : " + job.getTitle());

        activity.setActivityDate(
            job.getCreatedOn());

        activityList.add(activity);
        }

    // Completed Projects
    for (Project project : projectList) {

        if (project.getStatus() == ProjectStatus.COMPLETED) {

            ActivityResponseDto activity =
                    new ActivityResponseDto();

            activity.setMessage(
                    "Project Completed : "
                            + project.getJob().getTitle());

            activity.setActivityTime(
                    project.getCreatedAt());

            activityList.add(activity);
        }

    }

    // Successful Payments
    for (Payment payment : paymentList) {

        if (payment.getStatus() == PaymentStatus.SUCCESS) {

            ActivityResponseDto activity =
                    new ActivityResponseDto();

            activity.setMessage(
                    "Payment Released : ₹"
                            + payment.getAmount());

            activity.setActivityTime(
                    payment.getPaymentDate());

            activityList.add(activity);
        }

    }

    dto.setRecentActivities(activityList);

    return dto;
}
	
}
