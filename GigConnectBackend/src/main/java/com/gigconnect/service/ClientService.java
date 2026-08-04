package com.gigconnect.service;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.ClientDashboardResponseDto;
import com.gigconnect.dtos.client.ClientResponse;
import com.gigconnect.dtos.client.ClientUpdateDto;

public interface ClientService {

	ClientResponse getClientprofile();

	ApiResponse updateClientProfile(Long id , ClientUpdateDto dto);
	
	ClientDashboardResponseDto getDashboard(Long clientId);
	
}
