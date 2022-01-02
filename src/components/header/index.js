
import { useHeader } from '../../contexts/headerContext';

import {HeaderStyle} from './style' 
import {Col,Row} from 'react-bootstrap'
import {IoMenuOutline} from 'react-icons/io5'

import logo from '../../assets/images/logo_aedha.svg'

import {BotaoMenu,BotaoSair} from '../BotaoHeader'

import Menu from '../menu';


const Header =  () => {

    const {isMenuVisible, setIsMenuVisible} = useHeader();

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
                <BotaoSair onClick={()=>{localStorage.removeItem('@sisa-app/token')}} to='/'>SAIR</BotaoSair>
                </Col>
            </Col>
        </HeaderStyle>
          </Row>
          </>
    )
}

export default Header;