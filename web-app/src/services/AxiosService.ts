import axios from 'axios';

const AxiosService = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        Connection: 'keep-alive',
    },
});

export { AxiosService };