import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

function autorizado(){

    const token = localStorage.getItem('@sisa-app/token')

    if(!token) return false;

    try {
        jwt.verify(token,process.env.REACT_APP_JWT_SECRET)
        return true;
    }catch(err) {
        return false
    }
}

export default autorizado;