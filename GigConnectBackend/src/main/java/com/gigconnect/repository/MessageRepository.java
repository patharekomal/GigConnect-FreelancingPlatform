package com.gigconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigconnect.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

	   List<Message> findByProject_IdOrderBySentAtAsc(Long projectId);
}
