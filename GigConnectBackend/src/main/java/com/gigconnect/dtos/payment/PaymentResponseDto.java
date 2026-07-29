package com.gigconnect.dtos.payment;

import java.time.LocalDateTime;

import com.gigconnect.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {
	private Long paymentId;
	
	private String projectTitle;

//    private Long projectId;

    private Double amount;

    private PaymentStatus status;

    private LocalDateTime paymentDate;
}
