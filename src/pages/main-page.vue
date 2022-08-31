<template>
    <div class="main-page">
        <div class="main-page__input-container">
            <n-input @input="searchByQuery" v-model:value="query" type="text" placeholder="Поиск сделок"
                :loading="isLoadData" />
        </div>
        <div class="main-page__table-container">
            <n-table single-column>
                <thead>
                    <tr>
                        <th v-for="column in tableColumns" :key="column.id">{{ column.title }}</th>
                    </tr>
                </thead>
                <tbody v-if="leads && leads.length">
                    <data-row @respond="lead.isRespond = !lead.isRespond" v-for="lead in leads" :key="lead.id"
                        :lead="lead"></data-row>
                </tbody>
                <div v-if="isLoadData" class="main-page__loader-mask">
                        <custom-loader></custom-loader>
                </div>
            </n-table>
        </div>
    </div>

</template>
    
<script>
import axios from 'axios';
import './main-page.scss';
import CustomLoader from '@/components/loader.vue';
import DataRow from '@/components/data-row.vue';

export default {

    components: {
        CustomLoader,
        DataRow
    },

    async mounted() {
        this.getLeads();
    },

    data() {
        return {
            query: '',
            isLoadData: false,
            leads: [],
            tableColumns: [
                { id: 1, title: 'Название' },
                { id: 2, title: 'Статус' },
                { id: 3, title: 'Ответственный' },
                { id: 4, title: 'Дата создания' },
                { id: 5, title: 'Бюджет' }
            ]
        }
    },

    methods: {
        searchByQuery() {
            if(!this.isLoadData && this.query.length>=3){
                this.getLeads(this.query);
            }
        },
        async getLeads(query = '') {
            this.isLoadData = true;
            let params = {
                page: 1,
                with: 'contacts',
                limit: 250,
                query: query,
                filter: '',
                order: ''
            };
            let url = 'https://api-amo.herokuapp.com/api/leads?';
            for (let i in params) {
                if (i != 'page') {
                    url += `&${i}=${params[i]}`;
                } else {
                    url += `${i}=${params[i]}`;
                }
            }
            let data = await axios.get(url);
            this.leads = data.data;
            this.leads.forEach(element => element.isRespond = false);
            this.isLoadData = false;
        }
    }

}
</script>
    
<style>
</style>