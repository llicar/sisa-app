import styled from 'styled-components'

export const Container = styled.div`

    width:95%;
    margin: 0 auto;
    margin-top:100px;
    justify-content:center;

`

export const HeaderContainer = styled.div`

    display:flex;
    width:100%;
    justify-content:space-between;
    align-items:center;

    h1{
        color:white;
        font-family:roboto;
    }

`

export const TableContainer = styled.div`

    background-color:#243240;
    padding:15px;
    border-radius:7px;
    width:100%;
    margin-left:-16px;

`

export const Headertable = styled.div`

    display: flex;
    width:100%;
    justify-content:space-between;
    align-items:center;

    h2{
        color:#1EC3BA;
        font-family:roboto-regular;
    }


`

export const Row = styled.div`

    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:#334658;
    border-radius:7px;
    width:100%;
    margin-bottom:10px;

`

export const Cell = styled.div`

    height:70px;
    width: ${props => `${props.w}%`};
    align-items:center;
    display:flex;
    word-break: break-all;

    p{
        margin-left:5px;
        color:white;    
        font-family:roboto;
    }

`

export const CellEtapa = styled.div`

    height:70px;
    width: ${props => `${props.w}%`};
    align-items:center;
    display:flex;  
    justify-content:space-around; 

`