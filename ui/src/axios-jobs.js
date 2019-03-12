import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://44e93c36-0921-47b0-8e07-20e0350ce62d.mock.pstmn.io'
// });
const instance = axios.create({
        baseURL: 'http://localhost:8000'
    });
export default instance;