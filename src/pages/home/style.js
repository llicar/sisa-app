import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Menu = styled.div`

    width:100%;
    height:70vh;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:8vh;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;

    ul{
        width:100%;
        list-style:none;
    }

    li{
        justify-content:center;
        display:flex;
    }
    @media screen and (min-width: 0) and (max-width: 660px) {
        width:100%;
    }


`

export const LinkMenu = styled(Link)`

        width:30vw;
        height: 9vh;
        padding: 5px 10px 5px 10px;
        border-radius:7px;
        font-family: 'Roboto', sans-serif;
        display:flex;
        margin-bottom:25px;
        align-items:center;
        background-color:#1EC3BA;
        color:white;
        font-size:30pt;
        text-decoration:none;
        justify-content:space-between;
        border: 2px solid rgba(0,0,0,0);

        :hover{
                cursor: pointer;
                background-color:#169E97;
                box-shadow: -40px 0px 0px rgba(255, 255, 255, 0.9);
            }

`




