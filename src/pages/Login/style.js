import styled from 'styled-components'

export const ContainerLogin = styled.div`

width:500px;
margin: 0 auto;
margin-top:15vh;

@media screen and (min-width: 0) and (max-width: 660px) {
            width:90%;
            display:block;
        }


h1{
    text-align:center;
    margin-bottom:50px;
    font-family:Roboto;
    color:white;
    font-size:46px;
}
`
export const HeaderLogin = styled.div`

width:100%;
height:100px;
display:flex;
align-items:center;

h1{
    color:white;
    font-family:Roboto;
    margin-left:20px;
}

img{
    margin-left:30px;
}
`