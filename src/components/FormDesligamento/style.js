import styled from 'styled-components'

 export const FormDeslStyle = styled.form`

    width: 80%;
    select,input{
        border:none;
    }
    textarea{
        font-weight:15px;
        border:none;
    }
    label{
        font-size: 18px;
    }

    p{
        color: #FA5757;
        font-size:16px;
        font-family: Roboto;
    }

    input[type=submit]{
            background-color: ${props => props.disableButton};
            margin: 0 auto;
            width:100px;
            height:30px;
            margin-top: 30px;
        
            border-radius:5px;
            font-size:20px;
        }

`
export const DeslContainer = styled.div`
    width:70%;
    display:flex;
    align-items:center;
    justify-content:center;
`


