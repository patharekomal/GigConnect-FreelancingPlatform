
package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.MessageRequest;
import com.gigconnect.dtos.MessageResponse;

public interface MessageService {

    // Load all messages of a project
    List<MessageResponse> getMessagesByProject(Long projectId);

    // Save new message
    MessageResponse sendMessage(MessageRequest request);

}