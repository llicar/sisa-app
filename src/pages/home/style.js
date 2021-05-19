import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Menu = styled.div`
    
    border-radius:10px;
    width:660px;
    height:380px;
    display:flex;
    margin: 0 auto;
    margin-top:150px;
    justify-content:center;
    align-items:center;

    background-color:#243240;

    
    ul{
        width:100%;
        list-style:none;
        margin-left:-30px;
        margin-top:30px;

       
    }
    @media screen and (min-width: 0) and (max-width: 660px) {
        width:100%;
    }

`

export const LinkMenu = styled(Link)`

        width:70%;
        padding-top:5px;
        padding-bottom:5px;
        border-radius:7px;
        font-family: 'Roboto', sans-serif;
        display:flex;
        margin-bottom:32px;
        margin-left:auto;
        margin-right:auto;
        
        background-color:#1EC3BA;
        color:white;
        font-size:30px;
        text-decoration:none;
        justify-content:center;
        border: 2px solid rgba(0,0,0,0);

        :hover{
                cursor: pointer;
                background-color:#169E97;
                border: 2px solid white;
            }

`




