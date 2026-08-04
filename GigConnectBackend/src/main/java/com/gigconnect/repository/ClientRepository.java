package com.gigconnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Client;

public interface ClientRepository extends JpaRepository<Client,Long>{
	Optional<Client> findByUserDetailsId(Long userId);
}
