package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.BidRequest;
import com.gigconnect.dtos.freelancer.BidResponse;
import com.gigconnect.dtos.freelancer.UpdateBidRequest;
import com.gigconnect.entities.Bid;

public interface BidService {

	ApiResponse submitBid(Long freelancerId, BidRequest bid);

	List<BidResponse> getMyBidByFreelancerId(Long freelancerId);

	ApiResponse updateBid(Long bidId, UpdateBidRequest bid);

	ApiResponse deleteBid(Long bidId);

}
