import styled from 'styled-components';

export const Submit = styled.div`

    width: ${ props => `${props.w}px` };
    height:${ props => `${props.h}px` };
    background-color:${ props => `${props.color}` };
    border-radius:3px;
    margin-top:21px;
    display: flex ;
    justify-content: center;
    align-items: center;

    input,button{
        background-color:${ props => `${props.color}` };
        color:white;
        font-family:Roboto;
        font-weight:bold;
        border:none;
        font-size:12px;
        border-radius:3px;
        width:100%;
        height:100%;
        :hover{
            cursor: pointer;
            background-color: rgba(0,0,0,0.3);
        }
    }

`