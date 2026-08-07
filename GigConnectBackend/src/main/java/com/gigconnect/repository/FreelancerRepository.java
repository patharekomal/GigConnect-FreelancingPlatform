package com.gigconnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Freelancer;

public interface FreelancerRepository extends JpaRepository<Freelancer,Long> {
	Optional<Freelancer> findByUserDetailsId(Long userId);
}
