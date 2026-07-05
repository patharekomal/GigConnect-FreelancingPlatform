package com.gigconnect.entities;

import com.gigconnect.enums.BidStatus;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="bids")
@AttributeOverride(name="id",column=@Column(name="bid_id"))
public class Bid extends BaseClass{

	@Column
	private Double amount;
	
	@Column(name = "duration_days")
	private Integer durationDays;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String proposal;
	
	@Enumerated(EnumType.STRING)
	private BidStatus status=BidStatus.PENDING;
	
	
	@ManyToOne
	@JoinColumn(name = "job_id")
    private Job job; 
	
	@ManyToOne
    @JoinColumn(name="freelancer_id")
    private Freelancer freelancer;
	
	
    
}
