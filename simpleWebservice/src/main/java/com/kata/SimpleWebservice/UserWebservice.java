package com.kata.SimpleWebservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserWebservice {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/getUsers")
    @ResponseBody
    public List<User> getUsersFromDatabase() {
        return userRepository.findAll();
    }

//    @CrossOrigin
    @RequestMapping("/createUser")
    @PostMapping
    public void postUserIntoDatabase(@RequestBody User user) {
        userRepository.save(user);
    }

    @GetMapping("/getUserById")
    @ResponseBody
    public Optional<User> getUserById(@RequestParam String id) {
        return userRepository.findById(Long.valueOf(id));
    }
}
