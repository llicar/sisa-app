import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const LinkMenu = styled(Link)`

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
            border: 2px solid white;
}

`
export const Container = styled.div`

    display: flex;
    justify-content: right;
    width: 80%;
    margin: 0 auto;
    margin-top: 20vh;
`




