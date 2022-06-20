import api from "../providers/api";

class EmpresaService {
    async create (data){
       
        await api.post("/empresas",data);
    }

    async index () {
        return await api.get("/empresas");
    }

    async invEmpresas () {
        return await api.get("/invEmpresas");
    }

    async alterarEmpresaPorId (data,id) {
        return await api.post(`/empresas/${id}`,data);
    }
    
    async buscarEmpresaPorId (id) {
        return await api.get(`/empresas/${id}`);
    }

   }

export default new EmpresaService();