import React, { form } from "react";
import deleteUserById from "./userService/deleteUserById";
export default function DeleteUser() {

function handleSubmit(event) {
    event.preventDefault();
    const { id } = event.target;

    // debugger

    deleteUserById(id.value)
        .catch(error => alert(error))
};

   return (
       <div>
           <form ref={form} onSubmit={handleSubmit}>
               <label>UserId</label>
               <input type="number" name="id" placeholder="id" /><br />
               <button type="submit">delete</button>
           </form>
        </div> 
   );
}