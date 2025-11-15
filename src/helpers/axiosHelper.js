import axios from "axios";
import {BASE_URL} from "../config/config"
import {io} from 'socket.io-client'; 



const axiosInstance=axios.create()



axiosInstance.defaults.baseURL=BASE_URL            //http://localhost:PORT


axiosInstance.defaults.withCredentials=true        //enable cookies base authentication 



export const socket = io('https://video-tube-backend-o56e.onrender.com', {
    withCredentials: true
});


socket.on('connect', () => {
    console.log('WebSocket connected:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
});

export default axiosInstance;