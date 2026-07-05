package com.gigconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

}
