package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long>{

	List<Job> findByClientId(Long clientId);

}
