package com.gigconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.freelancer.BidRequest;
import com.gigconnect.dtos.freelancer.UpdateBidRequest;
import com.gigconnect.service.BidService;

import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/bids")
@RequiredArgsConstructor
public class BidController {

	//constructor based DI
	private final BidService bidService;
	
	//Submit Bids 
	@PostMapping("/{freelancerId}") 
	public ResponseEntity<?> submitBid(@PathVariable Long freelancerId,@RequestBody BidRequest bid )
	{
		return ResponseEntity.ok(bidService.submitBid(freelancerId,bid));
	}
	
	//get Bids which submitted by particular freelancer  with freelancerId
	@GetMapping("/{freelancerId}")
	public ResponseEntity<?> getMyBid(@PathVariable Long freelancerId )
	{
		return ResponseEntity.ok(bidService.getMyBidByFreelancerId(freelancerId));
	}
	
	//Update Bid 
	@PutMapping("/{bidId}")
	public ResponseEntity<?> updateBid(@PathVariable Long bidId,@RequestBody UpdateBidRequest bid )
	{
		return ResponseEntity.ok(bidService.updateBid(bidId,bid));
	}
	
	@DeleteMapping("/{bidId}")
	public ResponseEntity<?> deleteBid(@PathVariable Long bidId )
	{
		return ResponseEntity.ok(bidService.deleteBid(bidId));
	}
	
}
