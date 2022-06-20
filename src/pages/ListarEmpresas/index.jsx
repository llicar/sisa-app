
import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import { CgArrowRightR } from "react-icons/cg";

import DefaultTable from "../../components/Tables/DefaultTable"
import Filter from '../../components/Tables/filters/filter'
import SelectColumnFilter from '../../components/Tables/filters/SelectColumnFilter'

import SubmitButton from '../../components/SubmitButton'
import Header from '../../components/header'
import EmpresaService from '../../services/empresas'
import SquareLoader from "react-spinners/SquareLoader";
import style from './style.css'

const ListarJovens = () => {


    const COLUMNS = [
       
        {
          Header: 'NOME',
          accessor: 'nome',
          Filter
        },
        
        {
            Header: 'MODALIDADE',
            accessor: 'modalidade',
            Filter:SelectColumnFilter, 
            filter: "includes"
          },

        {
          Header: 'CH',
          accessor: 'ch',
          Filter:SelectColumnFilter, 
          filter: "includes"
        },

        {
            accessor: 'contrato',
            Filter,
            disableFilters: true
          },
        
        {
            accessor: 'detalhes',
            Filter,
            disableFilters: true
          },
      ];
    
    const [data,setData] = useState([]);
    const [showLoader,setShowLoader] = useState(true);

    useEffect(() => {
        EmpresaService.index()
        .then( response => {
            console.log(response.data)
            const newData = response.data.map( (response) => {

                const newObg = 
                    {
                        nome: response.nome_fantasia,
                        modalidade: response.tipo_contrato,
                        contrato: response.contrato,
                        ch: response.carga_horaria,
                        detalhes: <Link to={`/DetalheEmpresa/${response.id_empresa}`}><CgArrowRightR  className="linkArrow"/></Link>
                       
                    }
                
                return newObg;
            })
            console.log(newData)
            setData(newData);
            setShowLoader(false);
        })
    },[])  

    return (
        <body>
            <Header/>
            <div className="container_itens">
            <Link style={{fontSyle:'none'}} to={'/CadastrarEmpresa'}>
                <SubmitButton style={{border: '1px solid #1EC3BA'}} w={120} h={35} color={'rgba(0,0,0,0)'}>
                    <button>Cadastrar empresa</button>
                </SubmitButton>
            </Link>
            </div>
            
                {
                    showLoader?
                        <div className="loader">
                        <SquareLoader  color={'#1EC3BA'}/> 
                        </div>
                        
                        :
                        <DefaultTable COLUMNS={COLUMNS} DATA={data}></DefaultTable>
                }
            
                
        </body>
    )
}

export default ListarJovens;

