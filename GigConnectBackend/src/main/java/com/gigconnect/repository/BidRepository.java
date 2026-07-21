package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Bid;
import com.gigconnect.enums.BidStatus;

public interface BidRepository extends JpaRepository<Bid, Long> {

	List<Bid> findByFreelancerId(Long freelancerId);
	List<Bid> findByJobId(Long jobId);
	long countByFreelancerId(Long freelancerId);

	long countByFreelancerIdAndStatus(Long freelancerId, BidStatus status);
}
