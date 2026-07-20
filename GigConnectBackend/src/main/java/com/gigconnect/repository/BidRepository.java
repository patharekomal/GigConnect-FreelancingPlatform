package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

	List<Bid> findByFreelancerId(Long freelancerId);
	List<Bid> findByJobId(Long jobId);

}
