package com.gigconnect.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="freelancers")
//@AttributeOverride(name = "id",column = @Column(name="doctor_id"))
//Lombok annotations
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude ="userDetails",callSuper = true)
public class Freelancer extends BaseClass{
@Column(length = 100)
private String profession;

@Column(length=200)
private String  skills;

@Column
private float experience;

@Column(name="portfolio_link")
private String portfolioLink;

@Column(length = 500)
private String bio;

@Column(name="hourly_rate")
private double hourlyRate;

@Column
private float rating;

@OneToOne(cascade = CascadeType.ALL)
//to specify FK col name & not null constraint
@JoinColumn(name="freelancer_id",nullable = false)
@MapsId
private User userDetails;

// @OneToMany(mappedBy = "myBid",cascade = CascadeType.ALL)//this is for bidirectional relations check it once
// private List<Bid> bids=new ArrayList<>();
// @OneToMany(mappedBy = "myProject",cascade = CascadeType.ALL)
// private List<Project> projects=new ArrayList<>();
// //parameterized ctor - to init basic  details


}