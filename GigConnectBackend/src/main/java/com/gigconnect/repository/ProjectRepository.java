package com.gigconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Project;

public interface ProjectRepository extends JpaRepository<Project,Long>{

}
