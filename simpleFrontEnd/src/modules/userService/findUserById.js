import axios from 'axios';

export default function findUserById(id) {
   return axios.get(`http://localhost:8080/getUserById/${id}`)
        // .then(({ data }) => data)
}