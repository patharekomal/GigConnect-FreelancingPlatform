package com.gigconnect.dtos.client;

import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobUpdateDto {
	 @Size(max = 100,message = "Title can contain maximum 100 characters")
	 private String title;

	 @Size(max = 1000,message = "Description can contain maximum 1000 characters")
	 private String description;

	 @DecimalMin(value = "1.0",message = "Budget must be greater than 0")
	 private Double budget;

	 @Future(message = "Deadline must be a future date")
	 private LocalDate deadline;
}
