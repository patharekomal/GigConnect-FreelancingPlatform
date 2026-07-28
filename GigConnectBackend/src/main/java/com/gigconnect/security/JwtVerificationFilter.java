package com.gigconnect.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {

            log.info("========== JWT FILTER ==========");
            log.info("Request URI : {}", request.getRequestURI());

            String authHeader = request.getHeader("Authorization");

            log.info("Authorization Header : {}", authHeader);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {

                String jwt = authHeader.substring(7);

                log.info("JWT Received : {}", jwt);

                Claims payload = jwtUtils.verifyJwtAndExtractClaims(jwt);

                Long userId = payload.get("user_id", Long.class);
                String role = payload.get("user_role", String.class);

                log.info("User Id : {}", userId);
                log.info("Role : {}", role);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userId,
                                null,
                                List.of(new SimpleGrantedAuthority(role))
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                log.info("Authentication stored successfully");
            }
            else {
                log.info("Authorization header missing");
            }

            filterChain.doFilter(request, response);

        }
        catch (Exception e) {

            log.error("JWT Exception", e);

            SecurityContextHolder.clearContext();

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            response.getWriter().write("Invalid JWT");
        }
    }
}