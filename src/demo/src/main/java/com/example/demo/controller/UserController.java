package com.example.demo.controller;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login/user")
public class UserController {

    @Autowired
    private UserService loginService;

    @Autowired UserRepo userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

   @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            User stu = userRepository.findByEmail(authRequest.getUsername()).orElse(null);
            if (stu == null) {
                return ResponseEntity.status(404).body("User not found!");  
            }
            String password = stu.getPassword();
            try{
                Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
                System.out.println(authentication);
                if (passwordEncoder.matches(authRequest.getPassword(), password)) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials!");  
                }
            }
            catch(org.springframework.security.core.userdetails.UsernameNotFoundException e){
                return ResponseEntity.status(400).body("Invalid credentials!");  

            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("There was an error processing your request!");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO loginRequest) {
        User user = new User();
        user.setEmail(loginRequest.getEmail());
        user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        user.setRole("user");
        User savedLogin = loginService.save(user);
        return ResponseEntity.ok(savedLogin);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = loginService.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = loginService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = loginService.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (loginService.findById(id).isPresent()) {
            loginService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
