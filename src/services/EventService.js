import axios from 'axios';

// single axios instance for our entire app
const apiClient = axios.create({
    // base URL for calls to use
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    // for authentication & configuration
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getEvents() {
        return apiClient.get('/events');
    },
    getEvent(id) {
        return apiClient.get('/events/' + id);
    }
};
