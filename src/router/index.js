import Vue from 'vue';
import Router from 'vue-router';
import EventCreate from '../views/EventCreate';
import EventList from '../views/EventList';
import EventShow from '../views/EventShow';
import NProgress from 'nprogress';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventList
        },
        {
            path: '/event/:id',
            name: 'event-show',
            component: EventShow,
            props: true,
            // implementing a per route guard here which will run after the global beforeEach() guard
            // it doesn't have access to this which is why we import the store object
            beforeEnter(routeTo, routeFrom, next) {
                store
                    .dispatch('event/fetchEvent', routeTo.params.id)
                    .then(event => {
                        // props is turned on so this return the event object passed by event module as a prop
                        routeTo.params.event = event;
                        next();
                    });
            }
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        }
    ]
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start();
    next();
});

// lifecycle hook which means after it has been routed but before created()
router.afterEach(() => {
    NProgress.done();
});

export default router;
