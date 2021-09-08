import styled from 'styled-components';


const Modal = styled.div`

width:100%;
height:100vh;
position:fixed;
top:0;
left:0;
bottom:0;
right:0;
z-index:999;
display:flex;
justify-content:center;
align-items:center;

background-color:rgba(0,0,0,0.7);
backdrop-filter: blur(8px);



.container{
    background-color: ${props => props.status};
    width:60%;
    border-radius:10px;
    min-height: 230px;
    max-height: 600px;

    @media screen and (min-width: 0) and (max-width: 660px) {
            width:80%;
            display:block;
        }
    padding-bottom: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    
}

.content{
    display:flex;
    text-align:center;
    font-family:Roboto-Light;
    justify-content:center;
    font-size:12px;
}

.btn-enviar{
           
    margin: 0 auto;
    width:100px;
    height:30px;
    margin-top: 30px;

    border-radius:5px;

    font-size:20px;
}

h1{
    display: flex;
    justify-content:center;
    align-items:center;
    width:100%;
    font-family:Roboto;
    color:white;
}

hr{
    width:70%;
    margin-bottom: 30px;
    background-color:#415A72;
    color:black;
    border-color: #415A72;
    size:5px;
}

.close{
    float:right;
    cursor:pointer;
    display:flex;
    width:40px;
    height:40px;
    color:#1EC3BA;
}

.resumoContainer{
    display: flex;
    width: 100%;
    color:#fff;
    justify-content:center;
}

.tag{
    margin-right:20px;
    color:#1EC3BA;
}
.tag,.valuesInfo{
    width:40%;
}
.tag h2{
    text-align:right;
}
.valuesInfo h2{
    text-align:left;
}


.status{
    display:flex;
    height:100%;
    justify-content:center;
    align-items:center;
    margin: 0 auto;
  
    .spinner{
        display:flex;
        margin: 0 auto;
        justify-content:center;
        align-items:center;
        height:100%;
    }

    .statusResponse{
    color:white;
    font-family:roboto;
}

}


`
export default Modal;