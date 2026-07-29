package com.gigconnect.dtos.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class VerifyPaymentResponseDto {

	private boolean success;
    private String message;
    
    public VerifyPaymentResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}