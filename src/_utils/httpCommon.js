import axios from 'axios';

export default  axios.create({
    baseURL : 'https://teronext-node-api.herokuapp.com/',
    headers: {
      "Content-type": "application/json"
    }
});
