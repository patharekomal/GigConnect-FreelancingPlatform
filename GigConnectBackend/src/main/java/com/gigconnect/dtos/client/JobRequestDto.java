package com.gigconnect.dtos.client;

import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequestDto {
	 @NotBlank(message = "Job title is required")
	 @Size(max = 100)
	 private String title;
	 
	 @NotBlank(message = "Description is required")
	 @Size(max = 1000)
	 private String description;
	 
	 @NotNull(message = "Budget is required")
	 @DecimalMin(value = "1.0", message = "Budget must be greater than 0")
	 private Double budget;
	 
	 @NotNull(message = "Deadline is required")
	 @Future(message = "Deadline must be a future date")
	 private LocalDate deadline;
}
