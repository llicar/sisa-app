import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {useHistory} from 'react-router-dom'

import Home from './pages/home/index'
import Login from './pages/Login'
import autorizado from './utils/auth.js'
import { ToastContainer} from 'react-toastify';

import CadastrarEmpresa from './pages/CadastrarEmpresa/index'
import ListarEmpresas from './pages/ListarEmpresas/index'
import CadastrarJovem from './pages/CadastrarJovem'
import CadastrarJovem_2 from './pages/CadastrarJovem_2'
import CadastrarJovem_3 from './pages/CadastrarJovem_3'
import ListarJovens from './pages/ListarJovens'
import DetalheJovem from './pages/DetalhesJovem'
import Admissoes from './pages/Admissoes'
import VerDadosCadastrais from './pages/VerDadosCadastrais'
import DetalheEmpresa from './pages/DetalhesEmpresa'
import CadastrarFalta from './pages/CadastrarFalta'
import ConsultarFaltas from './pages/ConsultarFaltas'


const RotaPrivada = ({component:Component,...rest}) =>{

    const history = useHistory();

    return(
        <Route
        {...rest}
        render={props =>
            autorizado()? (
                <Component {...props}/>
            ):(
                history.push('/')
            )
        }
        />
    )
}


const Routes = () => {
    return (
            <BrowserRouter>
            <ToastContainer position={'top-center'} autoClose={2000}/>
                <Switch>
                    <Route path="/" exact component={Login} ></Route>
                    <RotaPrivada path="/Home" exact component={Home} ></RotaPrivada>
                    <RotaPrivada path="/ListarEmpresas" exact component={ListarEmpresas} ></RotaPrivada>
                    <RotaPrivada path="/CadastrarJovem" exact component={CadastrarJovem} ></RotaPrivada>
                    <RotaPrivada path="/CadastrarJovem_2/:id" exact component={CadastrarJovem_2} ></RotaPrivada>
                    <RotaPrivada path="/CadastrarJovem_3/:id" exact component={CadastrarJovem_3} ></RotaPrivada>
                    <RotaPrivada path="/ListarJovens" exact component={ListarJovens} ></RotaPrivada>
                    <RotaPrivada path="/DetalheJovem/:id" exact component={DetalheJovem} ></RotaPrivada>
                    <RotaPrivada path="/Admissoes" exact component={Admissoes} ></RotaPrivada>
                    <RotaPrivada path="/VerDadosCadastrais/:id" exact component={VerDadosCadastrais} ></RotaPrivada>
                    <RotaPrivada path="/DetalheEmpresa/:id" exact component={DetalheEmpresa} ></RotaPrivada>
                    <RotaPrivada path="/CadastrarFalta" exact component={CadastrarFalta} ></RotaPrivada>
                    <RotaPrivada path="/CadastrarEmpresa" exact component={CadastrarEmpresa} ></RotaPrivada>
                    <RotaPrivada path="/ConsultarFaltas" exact component={ConsultarFaltas} ></RotaPrivada>
                </Switch>
            </BrowserRouter>
    )
}

export default Routes;