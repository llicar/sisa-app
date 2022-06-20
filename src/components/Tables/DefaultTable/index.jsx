import React,{useMemo,useState} from 'react';
import {useTable,useGlobalFilter,useFilters} from 'react-table';
import {GlobalFilter} from '../filters/GlobalFilter.jsx'
import dateBetweenFilterFn from '../filtersFn/dateBetweenFilterFn.js'
import {StyledTable,Container,TableContainer} from './style.js'
import { exportarFaltas,exportarInventario,exportarEmpresas } from '../../../utils/exportarInventario'
import ExportButton from '../../ExportButton'
import {useRouteMatch} from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../../SubmitButton'

const DefaultTable = ({COLUMNS,DATA,STATE}) =>{

  const location = useRouteMatch();
  const path = location.path;

  const exportarNotif = () => toast("Dados exportados! :D",{type:'success',theme: "colored"})
  const erroNotif = () => toast("Ocorreu um erro :(",{type:'error',theme: "colored"})
  const [loading,setLoading] = useState([]);

  let exportar 
  if (path==='/ConsultarFaltas'){
    exportar = exportarFaltas
  } 
  else if(path==='/ListarJovens'){
    exportar = exportarInventario
  }
  else if(path==='/ListarEmpresas'){
    exportar = exportarEmpresas 
  } else{
    exportar = false
  }

  const columns = useMemo(()=> COLUMNS,[])
  const data = DATA

  dateBetweenFilterFn.autoRemove = val => !val;

  const filterTypes = React.useMemo(
    () => ({
      dateBetween: dateBetweenFilterFn,
    }),
    []
  );

  const initialState = { hiddenColumns: ['dataExportar','periodo','tempo','atividade','minutos','horas','salario','carga_horaria','tipo_salario','desconto'] };

  const tableInstance = useTable({
    columns,
    data,
    filterTypes,
    initialState
  },useGlobalFilter,useFilters)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilter,
  } = tableInstance

  const {globalFilter} = state
  
  const ExportarDados = async () =>{
    try{
      setLoading([1,'exportar'])
      let data = []
      rows.map( row => data.push(row.values))
      await exportar(data)
      setLoading(false)
      exportarNotif()
    } 
    catch(e) {
      setLoading(false)
      erroNotif()
    }
  }

  return (
    <>
    <Container>
      <div className="topo">
        <div className="pesquisar">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} preGlobalFilter={preGlobalFilter}/>
            <span><strong>{rows.length}</strong> Resultados</span>
        </div>
        <div className="exportar">
        {exportar?
          <SubmitButton w={120} h={35} id={'exportar'} loading={loading} color={'#1EC3BA'} > 
            <ExportButton action={()=>ExportarDados()}/> 
          </SubmitButton>:false }
        </div>
      </div>

      <TableContainer>
      <StyledTable {...getTableProps()}>
        <thead>
          {
            headerGroups.map((headerGroup)=>(
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column=>(
                    <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                  </th>
                  ))
                }
               
              </tr>
            ))
          }
          
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row=>{
              prepareRow(row)
              return(
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell)=>{
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })
          }
          
        </tbody>
      </StyledTable>
      </TableContainer>
    </Container>

      
    </>
  )
}

export default DefaultTable;


