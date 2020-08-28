<template>
    <div>
        <!-- using the user module, then user state, and name property -->
        <h1>Events for {{ user.user.name }}</h1>
        <EventCard
            v-for="event in event.events"
            :key="event.id"
            :event="event"
        />
        <template v-if="page != 1">
            <router-link
                :to="{ name: 'event-list', query: { page: page - 1 } }"
                rel="prev"
                >Prev Page</router-link
            >|
        </template>
        <template v-if="page !== lastPage">
            <router-link
                :to="{ name: 'event-list', query: { page: page + 1 } }"
                rel="next"
                >Next Page</router-link
            >
        </template>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
    components: {
        EventCard
    },
    // lifecycle hook
    created() {
        this.perPage = 3;

        this.$store.dispatch('event/fetchEvents', {
            perPage: this.perPage,
            page: this.page
        });
    },
    computed: {
        // returns the integer value for a url query that = 'page' or returns 1
        page() {
            return parseInt(this.$route.query.page) || 1;
        },
        lastPage() {
            return Math.ceil(this.event.totalEvents / this.perPage);
        },
        ...mapState(['event', 'user'])
    }
};
</script>
