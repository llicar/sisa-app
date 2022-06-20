import api from "../providers/api";

class ModalidadeService {
    
    async index () {
        return await api.get("/modalidade");
    }
}

export default new ModalidadeService();