import api from "../providers/api";

class Login {
    async login(data){
        return await api.post('/login',data)
    }
}

export default new Login();
