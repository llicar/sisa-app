import api from "../providers/api";

class Usuario {
    async login(data){
        return await api.post('/login',data)
    }

    async permissoes(id){
        return await api.get(`/permissoes/${id}`)
    }
}

export default new Usuario();
