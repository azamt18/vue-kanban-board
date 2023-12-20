import Vue from "vue";
import {API_HOST} from "@/settings/server";

class CardService {
    get({
            skip,
            limit,
            sort,
            desc,
            statusType,
            createdStart,
            createdEnd,
        }) {

        return Vue.axios.get(`${API_HOST}/api/cards/get`, {
            params: {
                limit: limit,
                skip: skip,
                sort: sort,
                desc: desc,
                statusType: statusType,
                createdStart: createdStart ? createdStart.format('YYYY-MM-DD') : null,
                createdEnd: createdEnd ? createdEnd.format('YYYY-MM-DD') : null
            }
        })
    }

    getSingle(id) {
        return Vue.axios.get(`${API_HOST}/api/cards/${id}`)
    }

    create({title: title, status: status}) {
        return Vue.axios.post(`${API_HOST}/api/cards/register`, {
            title: title,
            status: status
        })
    }

    update(id, {name, status}) {
        return Vue.axios.put(`${API_HOST}/api/cards/update/${id}`, {
            name: name,
            status: status
        })
    }

    delete(id) {
        return Vue.axios.delete(`${API_HOST}/api/cards/${id}`)
    }

    async deleteMany(ids) {
        try {
            const response = await Vue.axios.delete(`${API_HOST}/api/cards/delete-many`, {
                data: ids
            });

            return response.data;
        } catch (error) {
            console.error('Error deleting cards:', error);
            throw error;
        }
    }
}

export default new CardService()
