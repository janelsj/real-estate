import axios from 'axios';

const API = axios.create({
    baseURL: "https://dry-everglades-96859.herokuapp.com",
    headers: {'Access-Control-Allow-Origin': '*'}
});

export default API;