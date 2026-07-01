package com.gigconnect.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigconnect.custom_exceptions.AuthenticationFailedException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.AuthRequest;
import com.gigconnect.dtos.AuthResp;
import com.gigconnect.dtos.UserRegisterRequest;
import com.gigconnect.entities.Client;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.User;
import com.gigconnect.enums.UserRole;
import com.gigconnect.repository.ClientRepository;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	//dependency
	private final UserRepository userRepo;
	private final ModelMapper mapper;
	private final ClientRepository clientRepo;
    private final FreelancerRepository freelancerRepo;
    private final PasswordEncoder passwordEncoder;
	
	@Override
	public AuthResp authenticateUser(AuthRequest request) {
		User entity=userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new AuthenticationFailedException("Invalid email or password!!!!"));
		 if (!passwordEncoder.matches(request.getPassword(), entity.getPassword())) {
		        throw new AuthenticationFailedException("Invalid email or password");
		    }
		AuthResp dto = mapper.map(entity, AuthResp.class);
		dto.setMessage("Login Successful !");
		return dto;
	}

	@Override
	public ApiResponse registerUser(UserRegisterRequest request) {
		
		//Check whether email is already registered
		if (userRepo.existsByEmail(request.getEmail())) {
	        throw new RuntimeException("Email already exists!");      
	    }
		 User user = new User();

		 user.setFirstName(request.getFirstName());
		 user.setLastName(request.getLastName());
		 user.setEmail(request.getEmail());
		 
		// Encrypt password 
		 user.setPassword(passwordEncoder.encode(request.getPassword()));
		 user.setPhone(request.getPhone());
		 user.setRole(request.getRole());
		 
		 User savedUser = userRepo.save(user);
		 
		 if(request.getRole()==UserRole.CLIENT) {
			 // Validate client specific fields
	            if (request.getCompanyName() == null || request.getCompanyName().isBlank())
	                throw new RuntimeException("Company Name is required");

	            if (request.getIndustry() == null || request.getIndustry().isBlank())
	                throw new RuntimeException("Industry is required");

	            if (request.getLocation() == null || request.getLocation().isBlank())
	                throw new RuntimeException("Location is required");
	            
	            Client client = new Client();
	            client.setCompanyName(request.getCompanyName());
	            client.setCompanyWebsite(request.getCompanyWebsite());
	            client.setIndustry(request.getIndustry());
	            client.setLocation(request.getLocation());
	            client.setUserDetails(savedUser);
	            clientRepo.save(client);
		 }else {
			 // Validate freelancer specific fields
	            if (request.getProfession() == null || request.getProfession().isBlank())
	                throw new RuntimeException("Profession is required");

	            if (request.getSkills() == null || request.getSkills().isBlank())
	                throw new RuntimeException("Skills are required");

	            if (request.getHourlyRate() == null)
	                throw new RuntimeException("Hourly Rate is required");
	            Freelancer freelancer = new Freelancer();
	            freelancer.setProfession(request.getProfession());
	            freelancer.setSkills(request.getSkills());

	            if (request.getExperience() != null)
	                freelancer.setExperience(request.getExperience());
	            
	            freelancer.setPortfolioLink(request.getPortfolioLink());
	            freelancer.setBio(request.getBio());

	            freelancer.setHourlyRate(request.getHourlyRate());
	            //new freelancer t.f. rating is 0
	            freelancer.setRating(0.0f);
	            freelancer.setUserDetails(savedUser);

	            freelancerRepo.save(freelancer);
		 }
		return new ApiResponse("Success","User Registered Successfully");
	}

}
