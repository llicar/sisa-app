import {MenuStyle} from './style.js'
import { useHeader } from '../../contexts/headerContext';
import {Link,useRouteMatch} from 'react-router-dom';

import {IoMenuOutline} from 'react-icons/io5'
import {IoPersonAddSharp} from 'react-icons/io5'
import {IoSearchSharp} from 'react-icons/io5'
import {IoDocumentText} from 'react-icons/io5'
import {IoArrowBackCircleOutline} from 'react-icons/io5'

import logoAedha from '../../assets/images/logo_aedha.svg'

const Menu = () =>{

    const {setIsMenuVisible} = useHeader();
    const location = useRouteMatch();

    const path = location.path;

    
    return(
        <MenuStyle>
            <header>
                <IoArrowBackCircleOutline
                    className="iconeMenu exit"  
                    size={40}
                    onClick={()=>setIsMenuVisible(false)}
                />
                <img alt="logo aedha" src={logoAedha}/>
            </header>
            <div className="container">
                <ul>
                    <div className="tag">
                        <IoPersonAddSharp/> 
                        <h4>ADMISSÕES</h4>
                    </div>
                    <Link style={{textDecoration:'none', color:path==='/CadastrarJovem'?'#1EC3BA':'white'}} to='/CadastrarJovem'><li>Nova Admissão</li></Link>
                    <Link style={{textDecoration:'none', color:path==='/Admissoes'?'#1EC3BA':'white'}} to='/Admissoes'><li>Processos</li></Link>
                </ul>
                <ul>
                    <div className="tag">
                        <IoSearchSharp/> 
                        <h4>CONSULTAR</h4>
                    </div>
                    <Link style={{textDecoration:'none', color:path==='/ListarJovens'?'#1EC3BA':'white'}} to='/ListarJovens'><li>Aprendizes</li></Link>
                    <Link style={{textDecoration:'none', color:path==='/CadastrarEmpresa'?'#1EC3BA':'white'}} to='/CadastrarEmpresa'><li>Empresas</li></Link>
                </ul>
                <ul>
                    <div className="tag">
                        <IoDocumentText/> 
                        <h4>FALTAS</h4>
                    </div>
                    <li>Nova falta</li>
                    <li>Lançar faltas AP</li>
                    <li>Consultar faltas</li>
                </ul>
            </div>
        </MenuStyle>
    )
}

export default Menu;





{/*
      <Menu>
        <ul>
          <li><LinkMenu className="btn-menu" to='/CadastrarJovem'>Nova Admissão <RiUserAddFill/> </LinkMenu> </li>
          <li><LinkMenu className="btn-menu" to='/Admissoes'>Admissões <FaThList/></LinkMenu></li>
          <li><LinkMenu className="btn-menu" to='/ListarJovens'>Aprendizes <RiUserSearchFill/></LinkMenu></li>
          <li><LinkMenu className="btn-menu" to='/CadastrarEmpresa'>Empresas <IoBusiness/></LinkMenu></li>
        </ul>
</Menu>*/}