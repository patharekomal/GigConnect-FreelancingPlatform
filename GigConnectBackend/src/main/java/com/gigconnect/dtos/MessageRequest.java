package com.gigconnect.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {

    private Long projectId;
    
    @JsonProperty("senderId")
    private Long senderId;


    private String message;

}
