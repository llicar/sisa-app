import styled from 'styled-components';
import { useState } from 'react'
import { InputText } from '../../components/input'

const Table = styled.table`

    border-radius:10px;
    font-size:25px;
    font-family:roboto-regular;
    line-height:50px;
    margin: 0 auto;

    

    thead tr th {
        color:#1EC3BA;
        position: sticky;
        left: 0;
        top:0;
        background-color:#243240;
    }

    tbody{
        color: rgb(230,230,230);
        
    }
    

    td{
        border-bottom: 1px solid #415A72;
        background-color:#243240;   
    }   

`

const Container = styled.div`

    margin: 0 auto;
    margin-top:50px;
    width: 80%;
    padding:20px;
    border-radius:10px;
   
`

const TableContainer = styled.div`

    margin: 0 auto;
    margin-top: 20px;
    width:100%;
    background-color:#243240;
    padding:20px;
    border-radius:10px;
  
    

    input{
        height:40px;
        z-index:11;
        background-color:#415A72;
        border:none;
        border-radius:5px;
        color:white;
        font-size:18px;
        font-family:Roboto-Regular;
        text-indent:10px;
    }

   

`


const DataTable = ({ data }) => {



    const [q, setQ] = useState("");

    function search(rows) {
        return rows.filter((row) =>
            row.Nome.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Empresa.toLowerCase().indexOf(q.toLowerCase()) > -1
        )
    }

    const filterData = search(data);
   
    const columns = filterData[0] && Object.keys(filterData[0])


    return (

        <Container>

            <InputText style={{ width: '350px', marginLeft: '8px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '22px' }}>Pesquisar por Nome ou Empresa</label>
                <input
                    type='text'
                    style={{ "text-transform": "uppercase" }}
                    value={q}
                    onChange={(e) => {
                        setQ(e.target.value)
                    }
                    } />

            </InputText>

            <TableContainer>

                <Table cellPadding={15} cellSpacing={0}>
                    <thead>
                        <tr>{filterData[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
                    </thead>
                    <tbody>
                        {filterData.map(row => <tr>
                            {
                                columns.map(column => <td>{row[column]}</td>)
                            }
                        </tr>)}
                    </tbody>
                </Table>

            </TableContainer>
        </Container>
    )
}

export default DataTable;