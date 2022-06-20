import styled from 'styled-components';



export const InputText = styled.div`



width: ${ props => `${props.w}%` };
margin-bottom:23px;


label{
    color:white;
    font-family:Roboto-Light;
    font-size:18;
    margin-left:5px;
}

label.labelDataAtestado:hover{
    cursor:pointer;
    color: #1EC3BA;;
}

label.labelDataAtestado{
    align-items:center;
    display:flex;
}

input,select,textarea{

    display:flex;
    width:100%;
    height:40px;
    
    background-color:#415A72;
    border:1px solid #597B9C;
    border-radius:5px;
    color:white;
    font-size:18px;
    font-family:Roboto-Regular;
    margin-top:15px;
    text-indent:10px;

    ::-webkit-input-placeholder {
        color: white;
    }
 
    :-moz-placeholder { /* Firefox 18- */
        color: white;  
    }
 
    ::-moz-placeholder {  /* Firefox 19+ */
        color: white;  
    }
 
    :-ms-input-placeholder {  
        color: white;  
    }

}



label.file{
    display:flex;
    width:100%;
    height:40px;
    align-items:center;
    text-indent:10px;
    
    background-color:#465f77;
    border-radius:5px;
    color:white;
    font-size:18px;
    font-family:Roboto-Regular;
    margin-top:5px;
    :hover{
        cursor:pointer;
        background-color:#2F4153;
    }
}


input[type=file] {
    display: none;
}

@media screen and (min-width: 0) and (max-width: 660px) {
        width:100%; 
          
    }



`

export const InputFile = styled.div`

width: ${ props => `${props.w}%` };


label{
    color:#5E7F9F;
    font-size:18px;
    margin-left:5px;
}


label.file{
    display:flex;
    width:100%;
    height:40px;
    align-items:center;
    text-indent:10px;
    background-color:#314356;
    border-radius:5px;
    color:white;
    font-size:14px;
    font-family:Roboto-Regular;
    :hover{
        cursor:pointer;
        background-color:#364B61;
    }
}

input{
    display: none;
}


@media screen and (min-width: 0) and (max-width: 660px) {
        width:100%; 
          
    }

`
export const Submit = styled.input`

    width: ${ props => `${props.w}%` };
    height:38px;

    margin-top:21px;
    display: flex ;
    justify-content: center;
    align-items: center;
  
    background-color:#1EC3BA;
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
        background-color:#169E97}

`

