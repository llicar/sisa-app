import {HeaderStyle} from './style' 
import {Col,Row} from 'react-bootstrap'

import logo from '../../assets/images/logo_aedha.svg'

import {BotaoMenu,BotaoSair} from '../BotaoHeader'


const Header =  () => {
    return (
        <Row>
        <HeaderStyle>
            <Col>
            <img src={logo} alt='logo aedha'/>
            </Col>
            <Col style={{display: 'flex'}}>
                <Col>
                <BotaoMenu to='/Home'>INICIO</BotaoMenu>
                </Col>
                <Col>
                <BotaoSair onClick={()=>{localStorage.removeItem('@sisa-app/token')}} to='/'>SAIR</BotaoSair>
                </Col>
            </Col>
        </HeaderStyle>
          </Row>
    )
}

export default Header;