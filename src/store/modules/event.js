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
    createEvent({ commit, dispatch }, event) {
        // this prevents the store from being updated if the POST request does not complete
        return EventService.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event);
                const notification = {
                    type: 'success',
                    message: 'Your event has been created!'
                };
                // this goes to root store, finds notification module and runs add action passing the const notification
                dispatch('notification/add', notification, { root: true });
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message:
                        'There was a problem creating your event ' +
                        error.message
                };
                // this goes to root store, finds notification module and runs add action passing the const notification
                dispatch('notification/add', notification, { root: true });
                // this propogates an error to our component
                throw error;
            });
    },
    // passes in context object so we can access mutations
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS', response);
            })
            .catch(error => {
                const notification = {
                    type: 'error',
                    message:
                        // this is the error being passed into catch
                        'There was a problem fetching events: ' + error.message
                };
                // this goes to root store, finds notification module and runs add action passing the const notification
                dispatch('notification/add', notification, { root: true });
            });
    },
    fetchEvent({ commit, getters, dispatch }, id) {
        let event = getters.getEventById(id);

        if (event) {
            commit('SET_EVENT', event);
            // returns the event object to the router guard
            return event;
        } else {
            // by adding return it returns the repsonse object for our projectt bar in eventshow.vue
            return EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data);
                    // this returns the event object to the router guard
                    return response.data;
                })
                .catch(error => {
                    const notification = {
                        type: 'error',
                        message:
                            // this is the error being passed into catch
                            'There was a problem fetching an event: ' +
                            error.message
                    };
                    // this goes to root store, finds notification module and runs add action passing the const notification
                    dispatch('notification/add', notification, { root: true });
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
