<template>
    <tr>
        <td>
            <n-button type="info" ghost circle @click="$emit('respond')">{{
                    lead.isRespond ? '-' : '+'
            }}</n-button>
            <span>{{ lead.name }}</span>
        </td>
        <td>
            <n-tag type="info">
                {{ lead.status.name }}
            </n-tag>
        </td>
        <td>{{ lead.responsible_user.name }}</td>
        <td>{{ dateByTimestamp(lead.created_at) }}</td>
        <td>{{ lead.price }} руб.</td>
    </tr>
    <extra-rows v-if="lead.isRespond" :contacts="lead.contacts"></extra-rows>
</template>

<script>
import ExtraRows from './extra-rows.vue';

export default {

    components: {
        ExtraRows
    },

    props: [
        'lead'
    ],

    methods: {
        dateByTimestamp(timestamp) {
            let date = new Date(timestamp * 1000)
            return `${date.getDate()}.${date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()}.${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`;
        }
    }

}
</script>

<style>
</style>