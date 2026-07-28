package com.gigconnect.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwt.secret.key}")
    private String secret;

    @Value("${jwt.exp.time}")
    private long expTime; // in milliseconds

    private SecretKey key;

    @PostConstruct
    public void init() {
        log.info("******* Initializing JWT secret key");
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate JWT — embeds user_id and user_role as custom claims
    public String generateJWT(CustomUserDetailsImpl userDetails) {
        Date now = new Date();
        Date expDate = new Date(now.getTime() + expTime);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())   // ← setSubject not subject
                .setIssuedAt(now)
                .setExpiration(expDate)
                .addClaims(Map.of(                       // ← addClaims not claims
                        "user_id", userDetails.getUserId(),
                        "user_role", userDetails.getRole().name()
                ))
                .signWith(key, SignatureAlgorithm.HS256) // ← needs algorithm
                .compact();
        
    }

    // Verify JWT and extract all claims from payload
    public Claims verifyJwtAndExtractClaims(String jwt) {
    	return Jwts.parserBuilder()                      // ← parserBuilder not parser
    	        .setSigningKey(key)                      // ← setSigningKey not verifyWith
    	        .build()
    	        .parseClaimsJws(jwt)                     // ← parseClaimsJws not parseSignedClaims
    	        .getBody();                              // ← getBody not getPayload
    }
}