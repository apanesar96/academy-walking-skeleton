package com.kata.SimpleWebservice;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static java.util.Arrays.asList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserWebservice.class)
public class UserWebserviceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void defaultWebserviceEndpointShouldReturnGenericMessage() throws Exception {
        User user = new User("John Doe", 26, "1970-12-31");

        given(userRepository.findAll()).willReturn(asList(user));

        this.mockMvc.perform(get("/getUsers"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"name\":\"John Doe\",\"age\":26,\"dateOfBirth\":\"1970-12-31\"}]"));
    }

    @Test
    void should_post_and_create_a_new_user() throws Exception {
        this.mockMvc.perform(post("/createUser")
                    .content("{\"name\":\"John Doe\",\"age\":26,\"dateOfBirth\":\"1970-12-31\"}")
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void should_retrieve_a_user_by_id() throws Exception {
        User user = new User("Bruce Wayne", 58, "1966-12-31");

        given(userRepository.findById(1L)).willReturn(java.util.Optional.of(user));

        this.mockMvc.perform(get("/getUserById/?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"name\":\"Bruce Wayne\",\"age\":58,\"dateOfBirth\":\"1966-12-31\"}"));

        verify(userRepository).findById(1L);
    }
}

// Create an endpoint that accepts a unique identifier for a user and returns the user details