package com.gigconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.project.SubmitWorkRequest;
import com.gigconnect.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    
    //Get all Projects of Particular Freelancer
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<?> getProjectsByFreelancer(@PathVariable Long freelancerId)
    {
        return ResponseEntity.ok(projectService.getProjectsByFreelancer(freelancerId));
    }
    
  //Get all Projects of Particular Client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<?> getProjectsByClient(@PathVariable Long clientId){

        return ResponseEntity.ok(projectService.getProjectsByClient(clientId));
    }
    
    //Get project details
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectDetails( @PathVariable Long projectId) {

        return ResponseEntity.ok(projectService.getProjectDetails(projectId));
    }
    
    //Get Project details for client
    @GetMapping("/client/details/{projectId}")
    public ResponseEntity<?> getProjectByIdForClient(@PathVariable Long projectId){

        return ResponseEntity.ok(projectService.getProjectByIdForClient(projectId));
    }
    
    @PutMapping("/{projectId}/submit-work")
    public ResponseEntity<?> submitWork(@PathVariable Long projectId,@RequestBody @Valid SubmitWorkRequest request){

        return ResponseEntity.ok(projectService.submitWork(projectId, request));
    }
    
    @PatchMapping("/{projectId}/approve")
    public ResponseEntity<?> approveProject(@PathVariable Long projectId)
    {
        return ResponseEntity.ok(projectService.approveProject(projectId));
    }
    
    
}