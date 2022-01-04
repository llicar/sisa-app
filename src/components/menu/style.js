import styled from "styled-components";

export const MenuStyle = styled.div`

height:100%;
width:200px;
background-color:#243240;
position: fixed;
border-radius: 5px;

animation: fadeIn 0.3s;
  -webkit-animation: fadeIn 0.3s;
  -moz-animation: fadeIn 0.3s;
  -o-animation: fadeIn 0.3s;
  -ms-animation: fadeIn 0.3s;

  @keyframes fadeIn {
  0% {opacity:0; margin-left:-30px}
  100% {opacity:1;margin-left:0px}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;width:-30px}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;width:-30px}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;width:-30px}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;width:-30px}
  100% {opacity:1;}
}


header{
    display:flex;
    height:100px;
    justify-content: space-around;
    align-items: center;

    img{
        width:70px;
    }

    .iconeMenu{
        color: #fff;
        :hover{
            cursor:pointer;
            color: #415A72;
        }
    }
}

ul{
    list-style: none;
    font-family: Roboto;
    font-size: 16px;
    color: #fff;
    padding: 0;

    .tag{
        display: flex;
        align-items:center;
        margin-left: 15px;

        h4{
            margin-left: 10px;
            font-size:16;
            margin-bottom: 20px;
            color:#5E80A0;
    }
        }
    }

    li{
        padding: 7px 7px 7px 15px;

        :hover{
            background-color: #415A72;
            cursor: pointer;
        }
    }

.exit{
  -webkit-animation:spin 0.5s linear  ;
  -moz-animation:spin 0.5s  ;
  animation:spin 0.5s  ;

  @-moz-keyframes spin { 
    0%{
        -moz-transform: rotate(-45deg); 
        margin-left:-20px
      }
      100% { 
        -webkit-transform: rotate(0deg); 
        margin-left:0px
      } 
  }
  @-webkit-keyframes spin { 
      0%{
        -moz-transform: rotate(-45deg); 
        margin-left:-20px
      }
      100% { 
        -webkit-transform: rotate(0deg); 
        margin-left:0px
      } 
  }
  @keyframes spin { 
    0%{
        -moz-transform: rotate(-45deg); 
        margin-left:-20px
      }
      100% { 
        -webkit-transform: rotate(0deg); 
      margin-left:0px
      } 
  }

}




`