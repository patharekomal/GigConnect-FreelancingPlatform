package com.gigconnect.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    // Password Encoder Bean
    @Bean
<<<<<<< Updated upstream
    public PasswordEncoder passwordEncoder() {
=======
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 1. Disable CSRF
        http.csrf(csrf -> csrf.disable());

        // 2. Disable HttpSession — stateless JWT
        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 3. CORS — allow React frontend
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // 4. Authorization rules
        http.authorizeHttpRequests(request -> request

                // ── Public endpoints — no token needed ──────────────────
                .requestMatchers(
                        "/users/signin",
                        "/users/signup",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/chat/**"
                ).permitAll()

                // ── CLIENT only ──────────────────────────────────────────
                .requestMatchers(HttpMethod.POST,   "/jobs/**").hasAuthority("CLIENT")
                .requestMatchers(HttpMethod.PUT,    "/jobs/**").hasAuthority("CLIENT")
                .requestMatchers(HttpMethod.DELETE, "/jobs/**").hasAuthority("CLIENT")
                .requestMatchers(HttpMethod.GET,    "/client/**").hasAuthority("CLIENT")
                .requestMatchers(HttpMethod.PATCH,  "/client/**").hasAuthority("CLIENT")
             
               // .requestMatchers(HttpMethod.GET, "/jobs/**").hasAuthority("CLIENT")

                // ── FREELANCER only ──────────────────────────────────────
                .requestMatchers(HttpMethod.POST,  "/bids/**").hasAuthority("FREELANCER")
                .requestMatchers(HttpMethod.GET,   "/bids/**").hasAnyAuthority("CLIENT","FREELANCER")
                .requestMatchers(HttpMethod.GET,   "/freelancers/**").hasAuthority("FREELANCER")
                .requestMatchers(HttpMethod.PATCH, "/freelancers/**").hasAuthority("FREELANCER")
                .requestMatchers(HttpMethod.GET, "/jobs/**").hasAnyAuthority("CLIENT", "FREELANCER")

                // ── All remaining endpoints need authentication ───────────
                .anyRequest().authenticated()
        );

        // 5. Add JWT filter before Spring's default auth filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        // 6. Disable form login
        http.formLogin(form -> form.disable());

        return http.build();
    }

    // Allow requests from React Vite dev server
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
>>>>>>> Stashed changes
        return new BCryptPasswordEncoder();
    }

    // Security Configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())

                // Allow all requests (temporarily)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll())

                .cors(Customizer.withDefaults())

                // Disable default login page
                .formLogin(form -> form.disable())

                // Disable HTTP Basic Authentication
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}