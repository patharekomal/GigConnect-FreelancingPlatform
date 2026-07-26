package com.gigconnect.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigconnect.dtos.MessageRequest;
import com.gigconnect.dtos.MessageResponse;
import com.gigconnect.entities.Message;
import com.gigconnect.entities.Project;
import com.gigconnect.entities.User;
import com.gigconnect.enums.UserRole;
import com.gigconnect.repository.MessageRepository;
import com.gigconnect.repository.ProjectRepository;
import com.gigconnect.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

	private final ModelMapper modelMapper;

	@Override
	@Transactional(readOnly = true)
	public List<MessageResponse> getMessagesByProject(Long projectId) {
	    List<Message> messages = messageRepository.findByProject_IdOrderBySentAtAsc(projectId);
	    List<MessageResponse> responses = new ArrayList<>();
	    
	    for (Message message : messages) {
	        MessageResponse msg = modelMapper.map(message, MessageResponse.class);
	        
	        // Null checks to prevent 500 errors
	        if (message.getSender() != null) {
	            msg.setSenderName(message.getSender().getFirstName());
	        }
	        if (message.getReceiver() != null) {
	            msg.setReceiverName(message.getReceiver().getFirstName());
	        }
	        
	        responses.add(msg); // FIXED: Populates the list so React gets data
	    }
	    return responses;
	}

    

    @Override
    public MessageResponse sendMessage(MessageRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver;

        if(sender.getRole() == UserRole.FREELANCER)
        {
            receiver = project.getClient().getUserDetails();
        }
        else
        {
            receiver = project.getFreelancer().getUserDetails();
        }

        Message message = new Message();

        message.setProject(project);

        message.setSender(sender);

        message.setReceiver(receiver);

        message.setMessage(request.getMessage());

        message.setSentAt(LocalDateTime.now());

      
        Message savedMessage = messageRepository.save(message);

        return convertToResponse(savedMessage);

    }

    private MessageResponse convertToResponse(Message message) {

        MessageResponse response = new MessageResponse();

        response.setMessageId(message.getMessageId());

        response.setSenderId(message.getSender().getId());

        response.setSenderName(
                message.getSender().getFirstName() + " "
                        + message.getSender().getLastName());

        response.setMessage(message.getMessage());

        response.setSentAt(message.getSentAt());

        return response;

    }

}