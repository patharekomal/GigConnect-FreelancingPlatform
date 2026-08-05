package com.gigconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gigconnect.dtos.payment.CreateOrderRequestDto;
import com.gigconnect.dtos.payment.CreateOrderResponseDto;
import com.gigconnect.dtos.payment.PaymentFailedRequestDto;
import com.gigconnect.dtos.payment.PaymentResponseDto;
import com.gigconnect.dtos.payment.VerifyPaymentRequestDto;
import com.gigconnect.dtos.payment.VerifyPaymentResponseDto;
import com.gigconnect.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<CreateOrderResponseDto> createOrder(
            @RequestBody CreateOrderRequestDto request) throws Exception {

        return ResponseEntity.ok(paymentService.createOrder(request));
    }
    
    @PostMapping("/verify")
    public ResponseEntity<VerifyPaymentResponseDto> verifyPayment(
            @RequestBody VerifyPaymentRequestDto request) throws Exception {

        return ResponseEntity.ok(paymentService.verifyPayment(request));
    }
    
    @PatchMapping("/fail")
    public ResponseEntity<String> markPaymentFailed(
            @RequestBody PaymentFailedRequestDto request) {

        paymentService.markPaymentFailed(request);

        return ResponseEntity.ok("Payment marked as failed.");
    }
    
    @GetMapping("/client/history")
    public ResponseEntity<?> getPaymentsByClient() {

        List<PaymentResponseDto> payments =
                paymentService.getPaymentsByClient();

        return ResponseEntity.ok(payments);
    }
}