package com.gigconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Project;
import com.gigconnect.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

List<Review> findByFreelancerId(Long freelancerId);
Optional<Review> findByProjectId(Long projectId);
Optional<Review> findByProject(Project project);

}
