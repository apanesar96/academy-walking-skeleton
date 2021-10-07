package com.kata.SimpleWebservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Executable;
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


    @CrossOrigin
    @GetMapping("/getUserById")
    @ResponseBody
    public Optional<User> getUserById(@RequestParam String id) throws ResponseStatusException {

        return Optional.ofNullable(userRepository.findById(Long.valueOf(id)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
    }
}
