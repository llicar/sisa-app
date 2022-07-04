import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import jwt from "jsonwebtoken";

import {Form} from '../../components/form'
import {InputText} from '../../components/input'
import {InputContainer} from '../../components/inputContainer'
import {ContainerLogin,HeaderLogin} from './style.js'
import DotLoader from "react-spinners/DotLoader";
import {toast } from 'react-toastify';
import ServiceUsuario from '../../services/usuario'

import logo from '../../assets/images/logo_sisa.svg'

const loginErrNotif = () => toast('Usuário ou senha inválido',{type:'error',theme: "colored"})
const loginNotfi = (userName) => toast(`seja bem-vindo(a),${userName} 🎉`,{type:'default',theme: "colored"})

const Login = () => {

    const history = useHistory()
    const [loading,setLoading] = useState(false);

    const {register,handleSubmit,error} = useForm({})

    async function submit(data){
        try{
            setLoading(true)
            const response = await  ServiceUsuario.login(data);
            const permissions = await ServiceUsuario.permissoes(response.data.user_id)
            localStorage.setItem('@sisa-app/token',response.data.token,);
            localStorage.setItem('@sisa-app/user_id',response.data.user_id);
            localStorage.setItem('@sisa-app/user_permissions',permissions.data);
            history.push('/Home')
            const firstName = response.data.user_name.split(' ')
            loginNotfi(firstName[0])
        }catch(err){
            loginErrNotif()
            setLoading(false)
        }
    }
    return (
        <body>
        <HeaderLogin>
            <img src={logo} style={{width:'100px'}} alt='logo aedha'/>
            <h1>SISA</h1>
        </HeaderLogin>

        <ContainerLogin>
            <h1>Olá</h1>

            <Form style={{width: '100%'}} onSubmit={handleSubmit(submit)}>
            <InputContainer style={{width: '80%'}}>
                <InputText w={100}>
                    <label>Usuário</label>
                    <input type="text" name="usuario" ref={register}></input>
                </InputText>
            </InputContainer>

            <InputContainer style={{width: '80%'}}>
                <InputText w={100}>
                    <label>Senha</label>
                    <input type="password" name="senha" ref={register}></input>
                </InputText>
            </InputContainer>

            {
                loading? 
                <div style={{display: 'flex', margin: '0 auto',justifyContent: 'center'}}>
                    <DotLoader loading={loading} size={40} color={'#1EC3BA'} />
                </div>
                
                : <input type="submit" value="Entrar"/>
            }
            </Form>
        </ContainerLogin>
        </body>
    )
}
export default Login