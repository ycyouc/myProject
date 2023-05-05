//二次封装axios
import axios from "axios";

//create an axios instance
const request = axios.create({
    baseURL:'/api',
    timeout: 5000
})

// Add a request interceptor
request.interceptors.request.use(
    config => {
        //Do something before request is sent
        return config
    },
    error => {
        //Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
request.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
)

export default request