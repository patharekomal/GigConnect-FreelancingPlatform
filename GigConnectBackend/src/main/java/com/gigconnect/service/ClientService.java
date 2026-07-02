package com.gigconnect.service;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.ClientResponse;
import com.gigconnect.dtos.client.ClientUpdateDto;

public interface ClientService {

	ClientResponse getClientprofile(Long id);

	ApiResponse updateClientProfile(Long id , ClientUpdateDto dto);
	
}
