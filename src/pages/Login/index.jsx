import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

import {Form} from '../../components/form'
import {InputText} from '../../components/input'
import {InputContainer} from '../../components/inputContainer'
import {ContainerLogin,HeaderLogin} from './style.js'

import ServiceLogin from '../../services/login'

import logo from '../../assets/images/logo_aedha.svg'


const Login = () => {

    const history = useHistory()

    const {register,handleSubmit,error} = useForm({})

    async function submit(data){
        try{
            const response = await  ServiceLogin.login(data);
            localStorage.setItem('@sisa-app/token',response.data.token);
            history.push('/Home')
        }catch(err){
            alert('Usuario ou senha incorreto')
        }
         

    }

    return (
        <body>
        <HeaderLogin>
            <img src={logo} alt='logo aedha'/>
            <h1>SisA</h1>
        </HeaderLogin>

        <ContainerLogin>
            <h1>Bem-vindo</h1>

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

            <input type="submit" value="Entrar"/>

            </Form>
        </ContainerLogin>
        </body>
    )
}
export default Login