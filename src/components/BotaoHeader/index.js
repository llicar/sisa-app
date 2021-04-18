import styled from 'styled-components'

import {Link} from 'react-router-dom';

export const BotaoMenu = styled(Link)`

width: 150px;
height: 56px;
border-radius: 7px;
color:white;
display:flex;
font-family:Roboto;
font-weight:bold;
border: none;
font-size:18px;

margin-right:30px;
align-items:center;
justify-content:center;
text-decoration:none;

:hover{
    cursor: pointer;
    color:#1EC3BA;
    background-color:white;
    }


`
export const BotaoSair = styled(Link)`

width: 100px;
height: 56px;
border-radius: 7px;
color:#EB5757;
display:flex;
font-family:Roboto;
font-weight:bold;
border: none;
font-size:18px;
margin-right:30px;
align-items:center;
justify-content:center;
text-decoration:none;

:hover{
    cursor: pointer;
    color:white;
    background-color:#EB5757;
    }

`