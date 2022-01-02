import styled from 'styled-components'

export const HeaderStyle = styled.header `

width:100%;
height:100px;
display:flex;
align-items:center;
justify-content:space-between; 
border-radius:10px;

.col{
    display:flex;
    align-items:center;
}

.iconeMenu{
        color: #fff;
        :hover{
            cursor:pointer;
            color: #415A72;
        }
        margin-left: 22.5px;
    }


img{
    margin-left:45px;
    width:70px;
}

`