'use strict'

const response = require('./response');
const axios = require('axios');
const webApiUrl = 'https://perepe4kor.amocrm.ru';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhYjA3Mzc2NTRkMDIxMTIxNDVjODBjZjc2MjkzZjdiM2E0N2UzOGU0YWM5MWM1NDgwZDFiMWMxNGNkODg1MzM2ODNmMWJmZjVmYzU3N2MzIn0.eyJhdWQiOiIzYTY1ZDUzNy1kOWEwLTQ2ODMtYmVlMy00YzVmMmU0MDhiNTgiLCJqdGkiOiI5YWIwNzM3NjU0ZDAyMTEyMTQ1YzgwY2Y3NjI5M2Y3YjNhNDdlMzhlNGFjOTFjNTQ4MGQxYjFjMTRjZDg4NTMzNjgzZjFiZmY1ZmM1NzdjMyIsImlhdCI6MTY2MTkyMzQ0NiwibmJmIjoxNjYxOTIzNDQ2LCJleHAiOjE2NjIwMDk4NDYsInN1YiI6Ijg1MDUxMDkiLCJhY2NvdW50X2lkIjozMDM2NjcwNiwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.qemgqq8HZFXEn2BPn2bbRA6QutvPEsI1bjBG4014n14MEKW4HLwhKnX3AfhN2J3_VSYm3Ce_c_92usnFH7cBpKh_sHihN1nWvMVav8p5U1D3ahdqrVBYhcK0mr94s_t3wKInfSQLALV73rQHukc53V3MIQM70Lnv0sYgpK4YB04xQZR6HFxzcibZjhuzk-Qn5bmSBDqybNw3Pgmn-Z1rGNOSOY6pdZUBM06Fk3lJUmhDxWZE9RZb4b19bT_VCjmeU0UANYeqqqQn-KCZurQMZqYCWLHyX8NR5k-oV-oNwvvwGXWmvLlm3Tbvy4R0lW479FdzKfegBdLzSSoX6Ygf9A'

exports.get_leads = async (req, res) => {

    try {
        let { page = 1, limit = 250, query = '', filter = '', order = '', with: withParam } = req.query;
        let params = {
            'page': page,
            'query': query,
            'limit': limit,
            'filter': filter,
            'order': order,
            'with': withParam
        }

        let urlParams = '?';
        for (let i in params) {
            if (params[i] !== '' && i != 'page') {
                urlParams += `&${i}=${params[i]}`;
            } else {
                urlParams += `${i}=${params[i]}`;
            }
        }

        let data = await axios.get(`${webApiUrl}/api/v4/leads${urlParams}`, { headers: { "Authorization": `Bearer ${token}` } });

        let result = [];

        let leads = data.data._embedded.leads;

        for (let lead in leads) {
            result.push({
                name: leads[lead].name,
                created_at: leads[lead].created_at,
                price: leads[lead].price,
                responsible_user: await getResposibleUser(leads[lead].responsible_user_id),
                status: await getStatusesLeads(leads[lead].pipeline_id, leads[lead].status_id),
                company: await getCompanyById(leads[lead]._embedded.companies[0].id),
                contacts: await getContactsData(leads[lead]._embedded.contacts)
            })
        }

        response.status(result, res);
    } catch (error) {
        response.status([], res);
    }

}

async function getCompanyById(companyId) {

    try {
        let data = await axios.get(`${webApiUrl}/api/v4/companies/${companyId}`, { headers: { "Authorization": `Bearer ${token}` } });
        return data.data;
    } catch (error) {

    }

}

async function getResposibleUser(id) {

    try {
        let data = await axios.get(`${webApiUrl}/api/v4/users/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        return { name: data.data.name, email: data.data.email };
    } catch (error) {

    }

}

async function getStatusesLeads(pipelineId, statusId) {

    try {
        let data = await axios.get(`${webApiUrl}/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`, { headers: { "Authorization": `Bearer ${token}` } });
        return data.data;
    } catch (error) {

    }

}

async function getContactsData(contacts) {

    try {
        
        let result = [];
        for (let contact in contacts) {
            let data = await axios.get(`${webApiUrl}/api/v4/contacts/${contacts[contact].id}`, { headers: { "Authorization": `Bearer ${token}` } });
            result.push(data.data)
        }

        return result;
        
    } catch (error) {

    }





}
