import React, { useState, form } from "react";
import axios from 'axios';


export default function FindUserById() {

  const [user, setUser] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { id } = event.target;
    axios.get(`http://localhost:8080/getUserById/${id.value}`)
    .then(({data}) => {
        console.log(data);
        setUser(data);
    })
    .catch((err) => alert(err));
  }

    return (
        <div>
            <form ref={form} onSubmit={handleSubmit}>
                <label>UserId</label>
                <input type="number" name="id" data-testid="user-id" placeholder="Input ID here" /><br />
                <button type="submit">find by id</button>
            </form>
            {user !== null && 
            <>
              <div>{user.name}</div>
              <div>{user.age}</div>
              <div>{user.dateOfBirth}</div>
            </>
              }
        </div>
    )
}
