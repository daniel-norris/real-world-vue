import EventService from '@/services/EventService';

export const namespaced = true;

export const state = {
    events: [],
    totalEvents: 0,
    event: {}
};

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event);
    },
    SET_EVENTS(state, response) {
        state.events = response.data;
        state.totalEvents = +response.headers['x-total-count'];
    },
    SET_EVENT(state, event) {
        state.event = event;
    }
};

export const actions = {
    createEvent({ commit }, event) {
        // this prevents the store from being updated if the POST request does not complete
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event);
        });
    },
    // passes in context object so we can access mutations
    fetchEvents({ commit }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS', response);
            })
            .catch(error => {
                console.log('There was an error: ' + error.response);
            });
    },
    fetchEvent({ commit, getters }, id) {
        let event = getters.getEventById(id);

        if (event) {
            commit('SET_EVENT', event);
        } else {
            EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data);
                })
                .catch(error => {
                    console.log('There was an error:', error.response);
                });
        }
    }
};

export const getters = {
    catLength: state => {
        return state.categories.length;
    },
    getEventById: state => id => {
        return state.events.find(event => event.id === id);
    }
};
