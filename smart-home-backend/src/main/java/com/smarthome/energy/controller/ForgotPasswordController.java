package com.smarthome.energy.controller;

import com.smarthome.energy.model.User;
import com.smarthome.energy.repository.UserRepository;
import com.smarthome.energy.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOptional = userRepository.findByEmail(email);

        Map<String, String> response = new HashMap<>();

        if (!userOptional.isPresent()) {
            response.put("message", "Email not found!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOptional.get();
        // Generate 6-digit OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        user.setResetToken(otp);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(5)); // OTP valid for 5 mins
        userRepository.save(user);
        
        try {
            emailService.sendOtpEmail(user.getEmail(), otp);
            response.put("message", "OTP sent to your email!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error sending email. Please try again later.");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        Optional<User> userOptional = userRepository.findByEmail(email);
        Map<String, String> response = new HashMap<>();

        if (!userOptional.isPresent()) {
            response.put("message", "User not found!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOptional.get();
        if (user.getResetToken() == null || !user.getResetToken().equals(otp)) {
            response.put("message", "Invalid OTP!");
            return ResponseEntity.badRequest().body(response);
        }

        if (user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            response.put("message", "OTP has expired!");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "OTP verified successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        
        System.out.println("RESET ATTEMPT: Token=" + token + ", PassLength=" + (newPassword != null ? newPassword.length() : 0));

        Optional<User> userOptional = userRepository.findByResetToken(token);
        Map<String, String> response = new HashMap<>();

        if (!userOptional.isPresent()) {
            System.err.println("RESET FAILED: Invalid Token " + token);
            response.put("message", "Invalid token! Please request a new OTP.");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOptional.get();
        if (user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            System.err.println("RESET FAILED: Token Expired for user " + user.getEmail());
            response.put("message", "Token has expired! Please request a new OTP.");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiry(null);
        userRepository.save(user);

        System.out.println("RESET SUCCESS: Password updated for user " + user.getEmail());
        response.put("message", "Password updated successfully!");
        return ResponseEntity.ok(response);
    }
}
