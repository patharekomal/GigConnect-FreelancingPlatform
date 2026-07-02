package com.gigconnect.entities;

import java.time.LocalDateTime;

import com.gigconnect.enums.ProjectStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "projects")

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"job","client","freelancer"}, callSuper = true)

public class Project extends BaseClass {

    @OneToOne
    @JoinColumn(name = "job_id", nullable = false, unique = true)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "freelancer_id", nullable = false)
    private Freelancer freelancer;

    @Column(name = "agreed_amount", nullable = false)
    private Double agreedAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    @Column(name = "submitted_work", columnDefinition = "TEXT")
    private String submittedWork;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}