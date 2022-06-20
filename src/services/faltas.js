import api from "../providers/api";

class FaltasService {
    async create(data,id) {
        return await api.post(`/faltas/${id}`, data)
    }
    async index() {
        return await api.get("/faltas")
    }
    async buscarFaltaPorId(id) {
        return await api.get(`/faltas/${id}`)
    }
    async atualizarFalta(data,id) {
        return await api.post(`/atualizarFalta/${id}`,data)
    }
    async deletarFalta(id) {
        return await api.post(`/deletarFalta/${id}`)
    }

}

export default new FaltasService();