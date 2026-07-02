package com.gigconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.client.ClientResponse;
import com.gigconnect.dtos.client.ClientUpdateDto;
import com.gigconnect.service.ClientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {
	
	//Constructor based D.I.
	private final ClientService clientService;
	
	@GetMapping("{id}")
	public ResponseEntity<ClientResponse> getClientProfile(@PathVariable Long id){
		return ResponseEntity.ok(clientService.getClientprofile(id));
	}
	
	@PatchMapping("{id}")
	public ResponseEntity<?> updateClientProfile(@PathVariable Long id , @RequestBody @Valid ClientUpdateDto dto){
		return ResponseEntity.ok(clientService.updateClientProfile(id,dto));
	}
	
}
