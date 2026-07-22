package com.gigconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.ReviewResponseDto;
import com.gigconnect.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    

    @GetMapping("/freelancer/{id}")
    
    public ResponseEntity<List<ReviewResponseDto>>getFreelancerReviews(@PathVariable Long id) {

        return ResponseEntity.ok(reviewService.getFreelancerReviews(id));
    }

}