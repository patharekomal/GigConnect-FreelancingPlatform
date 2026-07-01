package com.gigconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Client;

public interface ClientRepository extends JpaRepository<Client,Long>{

}
