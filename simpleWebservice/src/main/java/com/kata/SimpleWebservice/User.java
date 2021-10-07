package com.kata.SimpleWebservice;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "example_user")
public class User {
    @JsonIgnore
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    private String name;
    private int age;
    @Column(name="dateofbirth")
    private LocalDate dateOfBirth;

    public User(String name, int age, String dateOfBirth){
        this.name = name;
        this.age = age;
        this.dateOfBirth = LocalDate.parse(dateOfBirth);
    }
}
