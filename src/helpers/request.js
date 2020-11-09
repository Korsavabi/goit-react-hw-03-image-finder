import axios from 'axios';

export const withCredentials = (url) => {
    return `${url}key=${process.env.REACT_APP_CLIENT_API}`
} 
export const request = async ( method, url, body = null) => {
    const result = await axios[method](url, body);

    return result.data;
}