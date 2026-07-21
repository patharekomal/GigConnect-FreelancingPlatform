package com.gigconnect.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ApiException;
import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.project.ProjectDetailsResponse;
import com.gigconnect.dtos.project.ProjectResponse;
import com.gigconnect.dtos.project.SubmitWorkRequest;
import com.gigconnect.entities.Project;
import com.gigconnect.enums.ProjectStatus;
import com.gigconnect.repository.ProjectRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    // Constructor based Dependency Injection
    private final ProjectRepository projectRepository;

    @Override
    public List<ProjectResponse> getProjectsByFreelancer(Long freelancerId) {

        // Fetch all projects assigned to freelancer
        List<Project> projects =
                projectRepository.findByFreelancerId(freelancerId);

        // Create response list
        List<ProjectResponse> list = new ArrayList<>();

        // Convert Entity -> DTO
        for(Project project : projects)
        {
            ProjectResponse dto = new ProjectResponse();

            // Project Details
            dto.setProjectId(project.getId());

            // Job Details
            dto.setJobId(project.getJob().getId());
            dto.setJobTitle(project.getJob().getTitle());

            // Client Details
            dto.setClientId(project.getClient().getId());

//            dto.setClientName(
//                    project.getClient().getUserDetails().getFirstName()
//                    + " "+ project.getClient().getUserDetails().getLastName()
//            );

            // Project Details
            dto.setAgreedAmount(project.getAgreedAmount());
            dto.setStatus(project.getStatus());

            list.add(dto);
        }

        return list;
    }

   //Get all project details by project id 
    @Override
    public ProjectDetailsResponse getProjectDetails(Long projectId) {

        // Fetch Project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Project Id"));

        // Create Response DTO
        ProjectDetailsResponse dto = new ProjectDetailsResponse();

        // Project Details
        dto.setProjectId(project.getId());
        dto.setStatus(project.getStatus());
        dto.setAgreedAmount(project.getAgreedAmount());
        dto.setSubmittedWork(project.getSubmittedWork());

        // Job Details
        dto.setJobId(project.getJob().getId());
        dto.setTitle(project.getJob().getTitle());
        dto.setDescription(project.getJob().getDescription());
        dto.setBudget(project.getJob().getBudget());
        dto.setDeadline(project.getJob().getDeadline());

        // Client Details
        dto.setClientId(project.getClient().getId());

        dto.setClientName(project.getClient().getUserDetails().getFirstName()+ " "+ project.getClient().getUserDetails().getLastName());

        dto.setCompanyName(project.getClient().getCompanyName());

        return dto;
    }
    
    //Submit Project Work 
    @Override
    public ApiResponse submitWork(Long projectId,SubmitWorkRequest request) {

        // Fetch Project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Project Id"));

        // Only active projects can be submitted
        if(project.getStatus() != ProjectStatus.IN_PROGRESS)
        {
            throw new ApiException(
                    "Only IN_PROGRESS projects can be submitted");
        }

        // Save Submitted Work
        project.setSubmittedWork(request.getSubmittedWork());

        // Update Status
        project.setStatus(ProjectStatus.SUBMITTED);

        // Save Changes
        projectRepository.save(project);

        return new ApiResponse("Successful","Work Submitted Successfully");
    }
}
