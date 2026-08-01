package com.gigconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gigconnect.entities.Project;
import com.gigconnect.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	//Check if a review already exists for a project
    boolean existsByProjectId(Long projectId);
    
    //Get all reviews of a freelancer
	List<Review> findByFreelancerId(Long freelancerId);
	
	//Get review of a project
	Optional<Review> findByProjectId(Long projectId);
	Optional<Review> findByProject(Project project);
	
	// Calculate average rating of a freelancer
	@Query("""
			SELECT AVG(r.rating)
			FROM Review r
			WHERE r.freelancer.id = :freelancerId
			""")
			Double getAverageRating(@Param("freelancerId") Long freelancerId);

}
