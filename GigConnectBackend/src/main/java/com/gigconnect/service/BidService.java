package com.gigconnect.service;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.BidRequest;

public interface BidService {

	ApiResponse submitBid(Long freelancerId, BidRequest bid);

}
