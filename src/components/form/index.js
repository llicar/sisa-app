
import  styled  from "styled-components";
export const Form = styled.form `
    
    width:50%;
    margin: 0 auto;
    padding-top:30px;
    padding-bottom:30px;
    background-color:#243240;
    border-radius: 10px;

    h2{
        color:white;
        font-family: Roboto-Thin;
        margin: 0 auto;
        font-size:24px;
        text-align:center;
        margin-bottom:20px;
        margin-top:10px;
    }

    hr{
        width:80%;
        margin-bottom:25px;
        border-color:#415A72;
    }

    @media screen and (min-width: 0) and (max-width: 660px) {
            width:100%;
            display:block;
        }

    input[type=submit]{
            width: 193px;
            height: 46px;
            margin: 0 auto;
            display:flex;
            align-content:center;
            justify-content:center;
            align-items:center;
            margin-top:30px;
            
            border-radius:7px;
            background-color:#1EC3BA;
            color:white;
            font-family:Roboto;
            border:none;
            font-size:26px;


            :hover{
                cursor: pointer;
                background-color:#169E97;
                border: 2px solid white;
            }
    }

    span.erro{
        color:#DB4B4B;
        font-family:Roboto-Regular;
      
    }

    p.info{
        color:#B2B8BF;
        font-family:roboto-light;
        font-size:16px;
        margin-left:10px;
        margin-top:1px;
    }
`

