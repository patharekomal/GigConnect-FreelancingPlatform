package com.gigconnect.dtos.project;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitWorkRequest {

    // GitHub Link / Drive Link / Live Demo etc.
    @NotBlank(message = "Submitted Work cannot be empty")
    private String submittedWork;

}