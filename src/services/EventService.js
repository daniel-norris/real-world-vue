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
    // check out the json-server docs to see pagination reqs
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
    },
    getEvent(id) {
        return apiClient.get('/events/' + id);
    },
    postEvent(event) {
        return apiClient.post('/events', event);
    }
};
