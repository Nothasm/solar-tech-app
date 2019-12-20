import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3003/api`
})

const state = {
    clients: [],
    client: {
        name: "",
        cpf: "",
        phoneNumber: "",
        email: "",
        addresses: []
    }
}

const getters = {
    clients: state => {
        return state.clients;
    },
    client: state => {
        return state.client;
    }
}

const actions = {
    async newClient ({commit}, client) {
        await api.post("client", client);
        const { data } = await api.get('client/');
        commit('setClients', data);
    },
    async updateClient ({commit}, client ) {
        alert(JSON.stringify(client))
        await api.put(`client/${client._id}`, client);
        const { data } = await api.get('client/');
        commit('setClients', data);
    },
    async fetchClients ({ commit }) {
        const { data } = await api.get('client');
        commit('setClients', data);
    },
    async getClient ({ commit }, id) {
        const { data } = await api.get(`client/${id}`);
        commit('setClient', data);
    },
    async deleteClient ({ commit }, id) {
        await api.delete(`client/${id}`);
        const { data } = await api.get('client/');
        commit('setClients', data);
    },
    async resetClient ({ commit }) {
        commit('setClient', {
            name: "",
            cpf: "",
            phoneNumber: "",
            email: "",
            addresses: []
        });
    },
    async pushAddress ({ commit }, address) {
        commit('pushAddress', address);
    },
    async removeAddress ({ commit }, index) {
        commit('removeAddress', index);
    }
}

const mutations = {
    setClients: (state, clients) => (state.clients = clients),
    setClient: (state, client) => state.client = client,
    pushAddress: (state, address) => state.client.addresses = [...state.client.addresses, address],
    removeAddress: (state, index) => state.client.addresses = state.client.addresses.filter((val, i) => i !== index)
}

export default {
    state,
    getters,
    actions,
    mutations
}
