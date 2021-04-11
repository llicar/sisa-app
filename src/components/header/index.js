import {HeaderStyle} from './style' 
import {Col,Row} from 'react-bootstrap'

import logo from '../../assets/images/logo_aedha.svg'

import BotaoMenu from '../BotaoMenu'


const Header =  () => {
    return (
        <Row>
        <HeaderStyle>
            <Col>
            <img src={logo} alt='logo aedha'/>
            </Col>
            <Col>
            <BotaoMenu to='/'>INICIO</BotaoMenu>
            </Col>
        </HeaderStyle>
          </Row>
    )
}

export default Header;