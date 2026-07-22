package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

List<Review> findByFreelancerId(Long freelancerId);

}
