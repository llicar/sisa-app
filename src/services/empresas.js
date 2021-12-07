import api from "../providers/api";

class EmpresaService {
    async create (data){
       
        await api.post("/empresas",data);
    }

    async index () {
        return await api.get("/empresas");
    }
    
    async buscarEmpresaPorId (id) {
        return await api.get(`/empresas/${id}`);
    }

   }

export default new EmpresaService();