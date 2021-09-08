import api from "../providers/api";

class JovemService {
    async create(data) {
        return await api.post("/jovens", data)
    }

    async index() {
        return await api.get("/jovens")
    }

    async show(id) {
        return await api.get(`/jovem/${id}`)
    }

    async update1(data, id) {
        return await api.post(`/update1/${id}`, data)
    }

    async update2(data, id) {
        return await api.post(`/update2/${id}`, data)
    }

    async showNotes(id) {
        return await api.get(`/anotacoes/${id}`)
    }

    async finalizarAdmissao(id) {
        return await api.post(`/finalizarAdmissao/${id}`)
    }

    async createNote(data, id) {
        return await api.post(`/anotacoes/${id}`, data)
    }

    async jovensEmProcesso() {
        return await api.get('/jovensEmProcesso');
    }

    async deletarAdmissao(id) {
        return await api.post(`/deletarAdmissao/${id}`);
    }
    async desligarJovem(data,id) {
        return await api.post(`/desligarJovem/${id}`,data);
    }
}

export default new JovemService();