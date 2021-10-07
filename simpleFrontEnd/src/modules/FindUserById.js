import React, { useState, useRef, form } from "react";
import axios from 'axios';


function FindUserById() {

  const [user, setUser] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { id } = event.target;
    const user = await axios.get(`http://localhost:8080/getUserById/?id=${id.value}`);
    setUser(user);
  }

    return (
        <div>
            <form ref={form} onSubmit={handleSubmit}>
                <label>UserId</label>
                <input type="number" name="id" placeholder="Input ID here" /><br />
                <button type="submit">find by id</button>
            </form>
            {user !== undefined && 
            <>
              <div>{user.name}</div>
              <div>{user.age}</div>
              <div>{user.dateOfBirth}</div>
            </>
              }
        </div>
    )
}