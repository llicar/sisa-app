import excelIcon from '../../assets/icons/excel.svg'

import styled from 'styled-components';

const StyleButton = styled.button`

    width: ${ props => `${props.w}px` };
    height: ${ props => `${props.h}px` };
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:15px!important;
    background-color: #1EC3BA;
    border: none;
    border-radius:4px;
    padding-inline: 10px;
    font-family: roboto;
    font-weight:bold;
    color: #fff;

    :hover{
        cursor: pointer;
        background-color: #188882;
    }

    img{
        width: 25px;
    }

`

const ExportButton = ({action}) => {

    return(
        <StyleButton onClick={action}>Exportar<img src={excelIcon} alt="baixar inventario"/></StyleButton>
    )
    
}

export default ExportButton;