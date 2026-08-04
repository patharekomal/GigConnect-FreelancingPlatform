package com.gigconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Client;
import com.gigconnect.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
    Optional<Payment> findByProjectId(Long projectId);
    List<Payment> findByProjectClientId(Long clientId);
    List<Payment> findByProjectClient(Client client);

}