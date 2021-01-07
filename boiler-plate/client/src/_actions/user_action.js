import axios from 'axios';
import { response } from 'express';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';


export function loginUser(dataTosubmit){
    
    const request= axios.post('/api/user/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: reqeust
    }

}

export function registerUser(dataTosubmit){
    
    const request= axios.post('/api/user/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: reqeust
    }

}

