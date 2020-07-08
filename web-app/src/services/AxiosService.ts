import axios from 'axios';

const URL =
    window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : 'https://celkbackend.herokuapp.com';

const AxiosService = axios.create({
    baseURL: URL,
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
