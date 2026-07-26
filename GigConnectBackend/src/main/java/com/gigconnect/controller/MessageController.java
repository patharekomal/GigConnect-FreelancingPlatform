package com.gigconnect.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.gigconnect.dtos.MessageRequest;
import com.gigconnect.dtos.MessageResponse;
import com.gigconnect.service.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public MessageResponse sendMessage(@RequestBody MessageRequest request) {
        return messageService.sendMessage(request);
    }

    @GetMapping("/project/{projectId}")
    public List<MessageResponse> getProjectMessages(@PathVariable Long projectId) {
        return messageService.getMessagesByProject(projectId);
    }
    
    
    //Websocket
    @MessageMapping("/chat.send")
    public void sendRealtimeMessage(MessageRequest request)
    {
        MessageResponse response = messageService.sendMessage(request);

        messagingTemplate.convertAndSend(
                "/topic/project/" + request.getProjectId(),
                response
        );
    }

}