import React, { useState, useRef } from "react";
import axios from 'axios';
import FindUserById from "./FindUserById";
import DeleteUser from './DeleteUser'

function Main() {

    const [users, setUsers] = useState([]);
    const form = useRef(null)

    const getUsers = async () => {
        const res = await axios.get(`http://localhost:8080/getUsers`);
        setUsers(res.data)
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(form.current)
        const payload = {};
        data.forEach((value, key) => payload[key] = value); 

        axios({
            method: "post",
            url: "http://localhost:8080/createUser",
            data: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    This is a simple webpage
                </h2>
                <form ref={form} onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name"/><br/>
                    <label>Age</label>
                    <input type="number" name="age" /><br />
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" /><br />
                    <input type="submit" value="Submit" /><br />
                </form>
                <p>
                    Click this button to get user data:
                    <button onClick={getUsers}>button</button>
                </p>

                {users.length > 0 &&
                    <>
                        <ul>
                            {users.map(function (user, index) {
                                return (
                                <>
                                    <li key={index}>Name: {user.name}</li>
                                    <li key={index + 1}>Age: {user.age}</li>
                                   <li key={index + 2}>Date of birth: {user.dateOfBirth}</li>
                                </>
                                );
                            })}
                        </ul>
                    </>
                }
                <FindUserById />
                <DeleteUser />
            </header>
        </div>
    )
}

export { Main }