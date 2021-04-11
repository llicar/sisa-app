import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/home/index'

import CadastrarEmpresa from './pages/CadastrarEmpresa/index'
import CadastrarJovem from './pages/CadastrarJovem'
import CadastrarJovem_2 from './pages/CadastrarJovem_2'
import CadastrarJovem_3 from './pages/CadastrarJovem_3'
import ListarJovens from './pages/ListarJovens'
import DetalheJovem from './pages/DetalhesJovem'
import Admissoes from './pages/Admissoes'
import VerDadosCadastrais from './pages/VerDadosCadastrais'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} ></Route>
                <Route path="/CadastrarEmpresa" exact component={CadastrarEmpresa} ></Route>
                <Route path="/CadastrarJovem" exact component={CadastrarJovem} ></Route>
                <Route path="/CadastrarJovem_2/:id" exact component={CadastrarJovem_2} ></Route>
                <Route path="/CadastrarJovem_3/:id" exact component={CadastrarJovem_3} ></Route>
                <Route path="/ListarJovens" exact component={ListarJovens} ></Route>
                <Route path="/DetalheJovem/:id" exact component={DetalheJovem} ></Route>
                <Route path="/Admissoes" exact component={Admissoes} ></Route>
                <Route path="/VerDadosCadastrais/:id" exact component={VerDadosCadastrais} ></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;