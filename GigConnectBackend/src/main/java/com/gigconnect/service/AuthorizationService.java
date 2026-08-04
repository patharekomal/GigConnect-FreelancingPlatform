package com.gigconnect.service;

import org.springframework.stereotype.Service;

import com.gigconnect.entities.Bid;
import com.gigconnect.entities.Client;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.Job;
import com.gigconnect.entities.Payment;
import com.gigconnect.entities.Project;

@Service
public class AuthorizationService {

    
    //Verify that the logged-in user owns this client profile.
    public void verifyClientOwner(Client client, Long loggedInUserId) {

        if (!client.getUserDetails().getId().equals(loggedInUserId)) {
            throw new RuntimeException("Access Denied");
        }
    }

    //Verify that the logged-in user owns this freelancer profile.
    public void verifyFreelancerOwner(Freelancer freelancer, Long loggedInUserId) {

        if (!freelancer.getUserDetails().getId().equals(loggedInUserId)) {
            throw new RuntimeException("Access Denied");
        }
    }

    //Verify that the logged-in client owns this job.
    public void verifyJobOwner(Job job, Long loggedInUserId) {

        if (!job.getClient().getUserDetails().getId().equals(loggedInUserId)) {

            throw new RuntimeException("Access Denied");
        }
    }

    //Verify that the logged-in freelancer owns this bid.
    public void verifyBidOwner(Bid bid, Long loggedInUserId) {

        if (!bid.getFreelancer().getUserDetails().getId().equals(loggedInUserId)) {

            throw new RuntimeException("Access Denied");
        }
    }

    //Verify that the logged-in client owns this project.
    public void verifyProjectClient(Project project, Long loggedInUserId) {

        if (!project.getClient().getUserDetails().getId().equals(loggedInUserId)) {

            throw new RuntimeException("Access Denied");
        }
    }

    //Verify that the logged-in freelancer owns this project.
    public void verifyProjectFreelancer(Project project, Long loggedInUserId) {

        if (!project.getFreelancer().getUserDetails().getId().equals(loggedInUserId)) {

            throw new RuntimeException("Access Denied");
        }
    }
    
    public void verifyBidJobOwner(Bid bid, Long userId) {

        if (!bid.getJob().getClient().getUserDetails().getId().equals(userId)) {

            throw new RuntimeException("Access Denied");
        }
    }
    
    public void verifyProjectAccess(Project project, Long userId) {

        boolean isClient = project.getClient().getUserDetails().getId().equals(userId);

        boolean isFreelancer = project.getFreelancer().getUserDetails().getId().equals(userId);

        if (!isClient && !isFreelancer) {
            throw new RuntimeException("Access Denied");
        }
    }
    
    public void verifyPaymentClient(Payment payment, Long userId) {

        if (!payment.getProject()
                .getClient()
                .getUserDetails()
                .getId()
                .equals(userId)) {

        	throw new RuntimeException("Access Denied");
        }
    }
    
    public void verifyPaymentAccess(Payment payment, Long userId) {

        boolean isClient = payment.getProject()
                .getClient()
                .getUserDetails()
                .getId()
                .equals(userId);

        boolean isFreelancer = payment.getProject()
                .getFreelancer()
                .getUserDetails()
                .getId()
                .equals(userId);

        if (!isClient && !isFreelancer) {
        	throw new RuntimeException("Access Denied");
        }
    }
}