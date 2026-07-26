package com.gigconnect.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {

    private Long messageId;

    private Long senderId;

    private String senderName;

    private String message;

    private LocalDateTime sentAt;
    
    private String receiverName;

}