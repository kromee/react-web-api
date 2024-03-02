import axios from 'axios';

axios.interceptors.request.use ((config)=>{
    const token_seguridad = window.localStorage.getItem('token');
    if (token_seguridad){
        config.headers.Authorization = 'Bearer ' + token_seguridad;
        return config;
    }
})

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;

const resquestGenerico = {
    get:(url)=>axios.get(url),
    post : (url, body) => axios.post(url, body),
    put : (url, body) => axios.put(url, body),
    delete : (url, body) => axios.delete( body)
}

export default resquestGenerico;
