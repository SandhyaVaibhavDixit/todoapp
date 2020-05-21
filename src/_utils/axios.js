import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://teronext-node-api.herokuapp.com/'
});

export default instance;