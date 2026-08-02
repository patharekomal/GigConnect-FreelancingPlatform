package com.gigconnect.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.ReviewRequest;
import com.gigconnect.dtos.ReviewResponseDto;
import com.gigconnect.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Validated
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse> addReview(
            @Valid @RequestBody ReviewRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reviewService.addReview(request));
    }
    
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<ReviewResponseDto>> getReviewsByFreelancer(
            @PathVariable Long freelancerId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByFreelancer(freelancerId));
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<ReviewResponseDto> getReviewByProject(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                reviewService.getReviewByProject(projectId));
    }
}