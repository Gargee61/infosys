package com.smarthome.energy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your OTP for Password Reset - EnergySmart");
            message.setText("Your verification code is: " + otp + "\n\nThis code is valid for 5 minutes. Do not share it with anyone.");
            mailSender.send(message);
            System.out.println("OTP sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("************************************************");
            System.err.println("GMAIL ERROR: Could not send email via SMTP.");
            System.err.println("YOUR OTP IS: " + otp);
            System.err.println("REASON: " + e.getMessage());
            System.err.println("************************************************");
            // We don't throw the exception here so the frontend doesn't get a 500 error.
            // In a real production app, you'd handle this differently.
        }
    }

    public void sendResetEmail(String to, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request - EnergySmart");
            message.setText("Click the link below to reset your password:\n" + resetLink + "\n\nThis link will expire in 15 minutes.");
            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("FAILED TO SEND EMAIL: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow to be caught by Controller
        }
    }
}
