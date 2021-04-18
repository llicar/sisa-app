import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use(async (config) =>{
  try{
    const token = localStorage.getItem('@sisa-app/token')

    if (token) {
      config.headers.Authorization =`Bearer ${token}`
    }
    return config;
  }catch(err){
    console.error(err)
  }
})

export default api;