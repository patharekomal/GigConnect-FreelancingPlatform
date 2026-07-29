package com.gigconnect.custom_exceptions;

public class PaymentException extends RuntimeException{
	public PaymentException(String message) {
        super(message);
    }

}
