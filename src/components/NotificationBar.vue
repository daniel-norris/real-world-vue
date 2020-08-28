<template>
    <div class="notification-bar" :class="notificationTypeClass">
        <p>{{ notification.message }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            timeout: null
        };
    },
    // lifecycle method that runs when the component is added to DOM - calls setTimeout and the remove action after 5s
    mounted() {
        this.timeout = setTimeout(() => this.remove(this.notification), 5000);
    },
    // this future proofs the component in case we add a close notification button which could cause a memory leak if closed before setTimeout completes
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    computed: {
        // dynamically applies a class depending on the notification type
        notificationTypeClass() {
            return `-text-${this.notification.type}`;
        }
    },
    // maps the remove action from the notification module
    methods: mapActions('notification', ['remove'])
};
</script>

<style scoped>
.notification-bar {
    margin: 1em 0 1em;
}
</style>
