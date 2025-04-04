import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:5000/v1',
});
instance.interceptors.response.use(function (response) {

    return response.data;

}, function (error) {


    return Promise.reject(error);

});

export default instance;

