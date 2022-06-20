import styled from "styled-components";

export const MenuStyle = styled.div`

height:100%;
width:200px;
background-color:#243240;
position: fixed;
border-radius: 5px;
z-index:999;
box-shadow: 10px 0px 20px rgba(0, 0, 0, 0.2);


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

`