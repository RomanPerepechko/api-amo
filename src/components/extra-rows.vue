<template>
    <tr v-for="contact in contacts" :key="contact.id">
        <td>{{ contact.name }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</template>

<script>
export default {
    props: [
        'contacts'
    ]
}
</script>

<style>
</style>