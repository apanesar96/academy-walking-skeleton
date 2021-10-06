package com.kata.SimpleWebservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserWebservice {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/getUsers")
    @ResponseBody
    public List<User> getUsersFromDatabase() {
        return (List<User>) userRepository.findAll();
    }

    @RequestMapping("/createUser")
    @PostMapping
    public void postUserIntoDatabase(@RequestBody User user) {
        userRepository.save(user);
    }
}