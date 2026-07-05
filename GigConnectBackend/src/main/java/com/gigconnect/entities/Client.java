package com.gigconnect.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "clients")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude ="userDetails",callSuper = true)
@AttributeOverride(name="id",column=@Column(name="client_id"))
public class Client extends BaseClass{
	@Column(name="company_name")
	private String companyName;
	@Column(name="company_website")
	private String companyWebsite;
	private String location;
	private String industry;
	@OneToOne(cascade = CascadeType.ALL) 
	//to specify FK col name & not null constraint
	@JoinColumn(name="client_id",nullable = false)
	@MapsId
	private User userDetails;
	
	public Client(String companyName, String companyWebsite, String location, String industry, User userDetails) {
		super();
		this.companyName = companyName;
		this.companyWebsite = companyWebsite;
		this.location = location;
		this.industry = industry;
		this.userDetails = userDetails;
	}
}
