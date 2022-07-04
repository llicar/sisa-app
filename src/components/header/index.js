
import { useHeader } from '../../contexts/headerContext';

import {HeaderStyle} from './style' 
import {Col,Row} from 'react-bootstrap'
import {IoMenuOutline} from 'react-icons/io5'

import logo from '../../assets/images/logo_sisa.svg'

import {BotaoMenu,BotaoSair} from '../BotaoHeader'

import Menu from '../menu';


const Header =  () => {

    const {isMenuVisible, setIsMenuVisible} = useHeader();

    function limparLocalStorage() {
        localStorage.removeItem('@sisa-app/token')
        localStorage.removeItem('@sisa-app/user_id')
        localStorage.removeItem('@sisa-app/user_permissions')
    }

    return (
        <>
        {
            isMenuVisible?<Menu/>:false
        }
        <Row>
        <HeaderStyle>
            <Col className="col">
                {
                    isMenuVisible?false:
                    <>
                        <IoMenuOutline 
                            className="iconeMenu" 
                            size={40}
                            onClick={()=>setIsMenuVisible(true)}
                        />
                        <img src={logo} alt='logo aedha'/>
                    </>

                }   
            </Col>
            <Col className="col">
                <Col>
                <BotaoMenu to='/Home'>INICIO</BotaoMenu>
                </Col>
                <Col>
                <BotaoSair onClick={()=>limparLocalStorage()} to='/'>SAIR</BotaoSair>
                </Col>
            </Col>
        </HeaderStyle>
          </Row>
          </>
    )
}

export default Header;