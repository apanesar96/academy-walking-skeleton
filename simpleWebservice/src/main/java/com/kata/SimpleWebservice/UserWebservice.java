package com.kata.SimpleWebservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class UserWebservice {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/getUsers")
    @ResponseBody
    public List<User> getUsersFromDatabase() {
        return userRepository.findAll();
    }

    @RequestMapping("/createUser")
    @PostMapping
    public void postUserIntoDatabase(@RequestBody User user) {
        userRepository.save(user);
    }

    @GetMapping("/getUserById/{id}")
    @ResponseBody
    public User getUserById(@PathVariable long id) throws ResponseStatusException {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
    }

    @DeleteMapping("/deleteUserById/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable long id) throws ResponseStatusException {
        userRepository.deleteById(id);
    }

}
