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
import com.gigconnect.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService{

	//Constructor based D.I.
	private final ClientRepository clientRepo;
	private final UserRepository userRepo;
	private final ModelMapper mapper;
	
	@Override
	public ClientResponse getClientprofile(Long id) {
		//Find client
		Client client = clientRepo.findById(id)
				.orElseThrow(()->
			       new ResourceNotFoundException("Invalid client Id :"+ id));
		
		ClientResponse dto = 
				mapper.map(client, ClientResponse.class);
		
		//User details are stored in User entity
		dto.setFirstName(client.getUserDetails().getFirstName());
		dto.setLastName(client.getUserDetails().getLastName());
		dto.setEmail(client.getUserDetails().getEmail());
		
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
	
}
