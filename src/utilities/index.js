import axios from 'axios';
import { Movies } from '../components';

export const moviesApi = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params: {
        api_key: '4a1c5a07df1f8aaa6cab280c2b4e5796',
    },
});

export const fetchToken = async() => {
    try {
        //request to authenticate new token
        const {data} = await moviesApi.get('/authentication/token/new');
        //get token
        const token = data.request_token;
        if(data.success){
            localStorage.setItem('request_token', token);
            //redirect to the site below with specfically the token generated from above
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, your token could not be created.');
    }

};

export const createSessionId = async() => {
    const token = localStorage.getItem('request_token');

    if (token) {
        try {
            const {data: {session_id}} = await moviesApi.post('authentication/session/new', {
                request_token: token,
            });
          localStorage.setItem('session_id', session_id);
          return session_id;
        } catch (error) {
            console.log(error);
        }
    }
}