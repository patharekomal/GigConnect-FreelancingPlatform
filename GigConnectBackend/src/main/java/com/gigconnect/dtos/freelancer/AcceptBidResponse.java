package com.gigconnect.dtos.freelancer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcceptBidResponse {
	 private String status;
	 private String message;
	 private Long projectId;
}
