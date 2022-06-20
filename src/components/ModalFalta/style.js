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


.content div{
    color: white;
    margin-bottom: 15px;
}

.titleFalta{
    display: flex;
    justify-content: space-around;
    font-family:Roboto;
    align-items: flex-end;
}

hr{
    border:none ;
    width:93%;
    margin-bottom:20px;
}

.containerFalta{
    display: flex;
    justify-content: space-between;
}

.infoFalta,.infoFalta2{
    width:40%;
    margin:0 auto;
    border-radius:10px;
    font-family:Roboto;
    padding: 15px ;
    display:flex;
    flex-direction: column;
}

.infoFalta{
    border: 1px solid ${props => props.statusFalta};
    background-color:#314356;
    height:250px;
    justify-content:center;
}
.infoFalta2{
   padding-top:0;
}

.atestadoFalta{
    width:80%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    input{
        font-family:Roboto;
    }
    
}

.actionFalta{
    width:90%;
    margin:0 auto;
    display: flex;
    justify-content: flex-end;
}
.container{
    background-color: #243240;
    width:60%;
    border-radius:10px;
    min-height: 230px;
    max-height: 600px;

    @media screen and (min-width: 0) and (max-width: 660px) {
            width:80%;
            display:block;
        }
    border: 1px solid black;
}

.content{
    font-family:Roboto-Light;
}

.close{
    float:right;
    cursor:pointer;
    display:flex;
    width:40px;
    height:40px;
    color:#1EC3BA;
}

.linkAtestado{
    color:#fff;
    font-size:16px ;
    font-family:Roboto;

    :hover{
        color: #1EC3BA
    }
}

.containerAtestado{
    display: flex ;
    flex-direction:column;
    justify-self:flex-end;
}

.groupTextInfo{
    label{
        color:#5E7F9F;
        font-size:18px;
    }
    p,a{
        margin-top:0px;
        font-size:20px;
    }
}

`
export default Modal;