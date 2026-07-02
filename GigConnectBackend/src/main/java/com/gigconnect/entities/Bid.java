package com.gigconnect.entities;

import java.time.LocalDateTime;

import com.gigconnect.enums.BidStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Bid {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bid_id")
	private Long bidId;
	
	@Column
	private Double amount;
	
	@Column(name = "duration_days")
	private Integer durationDays;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String proposal;
	
	@Enumerated(EnumType.STRING)
	private BidStatus status;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@ManyToOne
	@JoinColumn(name = "job_id")
    private Job job; 
	
	@ManyToOne
    @JoinColumn(name="freelancer_id")
    private Freelancer freelancer;
	
	
    
}
