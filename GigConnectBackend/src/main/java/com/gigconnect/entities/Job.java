package com.gigconnect.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.gigconnect.enums.BidStatus;
import com.gigconnect.enums.JobStatus;

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
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@AttributeOverride(name="id",column=@Column(name="job_id"))
@Table(name = "jobs")
@ToString(exclude = "client", callSuper = true)
public class Job extends BaseClass {
	@Column(nullable = false, length = 100)
	private String title;
	
	@Column(nullable = false, length = 1000)
	private String description;
	
	@Column(nullable = false)
	private Double budget;
	
	 @Enumerated(EnumType.STRING)
	 @Column(nullable = false)
	 private JobStatus status;
	 
	 @Column(nullable = false)
	 private LocalDate deadline;
	 
	 //Many jobs have one client
	 @ManyToOne
	 @JoinColumn(name = "client_id", nullable = false)
	 private Client client;
}
