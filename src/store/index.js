import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: { id: 'abc123', name: 'Adam Jahr' },
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ],
        events: [
            { id: 1, title: '...', organiser: '...' },
            { id: 2, title: '...', organiser: '...' },
            { id: 3, title: '...', organiser: '...' },
            { id: 4, title: '...', organiser: '...' }
        ]
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        }
    },
    actions: {
        createEvent({ commit }, event) {
            // this prevents the store from being updated if the POST request does not complete
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event);
            });
        }
    },
    modules: {},
    getters: {
        catLength: state => {
            return state.categories.length;
        },
        getEventById: state => id => {
            return state.events.find(event => event.id === id);
        }
    }
});
