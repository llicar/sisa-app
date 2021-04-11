import api from "../providers/api";

class EmpresaService {
    async create (data){
       
        await api.post("/empresas",data);
    }

    async index () {
        return await api.get("/empresas");
    }

   }

export default new EmpresaService();