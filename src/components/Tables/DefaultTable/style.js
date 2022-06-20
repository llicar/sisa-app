import styled from 'styled-components'

export const StyledTable = styled.table`

    border-radius:10px;
    font-size:25px;
    font-family:roboto-regular;
    line-height:50px;
    margin: 0 auto;
    border-spacing: 30px;

    thead tr th {
        color:#1EC3BA;
        position: sticky;
        left: 0;
        top:0;
        background-color:#243240;
        text-align: center;
        font-size:18px;   
        z-index:3;
    }


    tbody{
        color: rgb(230,230,230);
        
    }
    

    td{ 
        font-size:16px;
        border-bottom: 1px solid #415A72 ;
    } 

    .DetalheFalta{
        display:none;
    }

    .ContainerStatus:hover{
        .StatusFalta{
            display:none;
        }
        .DetalheFalta{
            display:block;
        }
        cursor:pointer;
    }

    .StatusFalta{
        width: 28px;
        margin-top:auto;
        margin-bottom:auto;
        display:block;
    }
    
    .DetalheFalta{
        width: 28px;
        margin-top:auto;
        margin-bottom:auto;
    }

    .btn-excluir{
        margin-top:25px;
        background:none;
        border-radius:3px;
        border: none;
        :hover{
            cursor: pointer;
            background:#1F2C39;
            border:1px solid #F16C6C;

            img{
                width: 24px!important
            }
        }
        :active{
            img{
                width: 28px!important
            }
        }
    }
`


export const Container = styled.div`

    margin: 0 auto;
    margin-top:50px;
    width: 90%;
    padding:20px;

    .topo{
        display: flex;
        align-items:center;
        flex-direction: column; 
        width: 100%;

        .pesquisar{
            width:40%;
            display:flex;
            justify-content:center;
            flex-wrap: wrap; 
            flex-direction: row; 

            input{
                height:30px;
                border: 1px solid #415A72;
                background-color:#243240;
                border-radius:5px;
                color:#628BB5;
                font-size:18px;
                font-family:Roboto;
                width:100%;
                text-align:center;
            }

            span{
                font-size:20px;
                color:#1EC3BA;
                font-family:Roboto;
                
            }
        }

        .exportar{
            align-self: flex-end;
        }
           
    }
  
`
export const TableContainer = styled.div`

    margin: 0 auto;
    margin-top: 20px;
    width:100%;
    background-color:#243240;
    padding:20px;
    border-radius:10px;
  
    

    input,select{
        height:30px;
        z-index:11;
        border: 1px solid #415A72;
        background-color:#243240;
        border-radius:5px;
        color:white;
        font-size:16px;
        font-family:Roboto;
        width:90%;
        
    }   

    input[type="date"]{
        width:130px!important;
        font-size: 15px!important;
    }

   

`