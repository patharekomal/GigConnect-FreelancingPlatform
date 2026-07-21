package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Project;
import com.gigconnect.enums.ProjectStatus;

public interface ProjectRepository extends JpaRepository<Project,Long>{

	List<Project> findByFreelancerId(Long freelancerId);
	long countByFreelancerIdAndStatus(Long freelancerId,ProjectStatus status);
}
