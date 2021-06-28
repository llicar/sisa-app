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

