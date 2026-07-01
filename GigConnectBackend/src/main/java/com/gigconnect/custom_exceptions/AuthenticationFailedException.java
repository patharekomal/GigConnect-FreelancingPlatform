package com.gigconnect.custom_exceptions;

public class AuthenticationFailedException extends RuntimeException{

	public AuthenticationFailedException(String msg) {
		super(msg);
	}

}
