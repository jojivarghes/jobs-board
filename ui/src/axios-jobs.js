import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://44e93c36-0921-47b0-8e07-20e0350ce62d.mock.pstmn.io'
});

export default instance;