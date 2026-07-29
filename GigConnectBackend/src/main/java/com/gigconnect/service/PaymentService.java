package com.gigconnect.service;

import java.util.List;

import org.json.JSONObject;

import com.gigconnect.dtos.payment.CreateOrderRequestDto;
import com.gigconnect.dtos.payment.CreateOrderResponseDto;
import com.gigconnect.dtos.payment.PaymentFailedRequestDto;
import com.gigconnect.dtos.payment.PaymentResponseDto;
import com.gigconnect.dtos.payment.VerifyPaymentRequestDto;
import com.gigconnect.dtos.payment.VerifyPaymentResponseDto;

public interface PaymentService {
	CreateOrderResponseDto createOrder(CreateOrderRequestDto request) throws Exception;
	
	VerifyPaymentResponseDto verifyPayment(VerifyPaymentRequestDto request) throws Exception;

	void markPaymentFailed(PaymentFailedRequestDto request);
	
	List<PaymentResponseDto> getPaymentsByClient(Long clientId);
}
