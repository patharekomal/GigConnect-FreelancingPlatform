package com.gigconnect.dtos.payment;

import java.time.LocalDateTime;

import com.gigconnect.enums.PaymentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreelancerPaymentResponseDto {
	private Long paymentId;

	private String projectTitle;

	private String clientName;

	private Double amount;

	private PaymentStatus status;

	private LocalDateTime paymentDate;
}
