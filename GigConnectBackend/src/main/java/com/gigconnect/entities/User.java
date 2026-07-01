package com.gigconnect.entities;

import java.time.LocalDate;

import com.gigconnect.enums.UserRole;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor 
@Getter 
@Setter 
@ToString(exclude = "password")
//JPA annotations
@Entity // to declare Entity class - to tell Hibernate to manage entity life cycle
@Table(name = "users") // customizes table name
@AttributeOverride(name = "id", column = @Column(name = "user_id"))//id present in base class
public class User extends BaseClass {

	@Column(name = "first_name", length = 30) // col name , varchar(30)
	private String firstName;
	@Column(name = "last_name", length = 30) // col name , varchar(30)
	private String lastName;
	@Column(length = 30, unique = true) // col name , varchar(30) , unique constraint
	private String email;
	@Column(length = 300, nullable = false) // NOT NULL constraint
	private String password;
//	private LocalDate dob;
	@Column(length = 14, unique = true)
	private String phone;
	@Enumerated(EnumType.STRING) // col type - varchar | enum
	private UserRole role;
//	@Column(name = "image_path")
//	private String imagePath;
	 
	
	
	

}