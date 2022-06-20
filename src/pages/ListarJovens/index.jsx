
import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import { CgArrowRightR } from "react-icons/cg";
import ExportButton from "../../components/ExportButton"
import {exportarInventario} from "../../utils/exportarInventario"
import DefaultTable from "../../components/Tables/DefaultTable"

import Header from '../../components/header'
import JovemService from '../../services/jovens'
import dataFormat from "../../utils/dataFormat"
import SquareLoader from "react-spinners/SquareLoader";


import style from './style.css'

import {DateRangeColumnFilter} from '../../components/Tables/filters/RangeFilter'
import Filter from '../../components/Tables/filters/filter'


const ListarJovens = () => {

     const COLUMNS = [
       
        {
          Header: 'NOME',
          accessor: 'nome',
          Filter
        },
        {
          Header: 'EMPRESA',
          accessor: 'empresa',
          Filter
        },
        {
          Header: 'ADMISSÃO',
          accessor: 'admissao',
          Filter:DateRangeColumnFilter,
          filter: "dateBetween",
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

        JovemService.index()
        .then( response => {
            const newData = response.data.map( (response) => {
                const newObg = 
                    {
                        nome: response.nome,
                        admissao: dataFormat.fullDateBR(response.admissao) ,
                        empresa: response.nome_fantasia,
                        detalhes: <Link to={`/DetalheJovem/${response.id_jovem}`}><CgArrowRightR  className="linkArrow"/></Link>
                       
                    }
                return newObg;
            })
            setData(newData);
            setShowLoader(false);
        })},[])  


    return (
        <body>
            <Header/>
            <div className="container_itens">
            </div>
          
                {
                    showLoader?
                        <div className="loader">
                        <SquareLoader color={'#1EC3BA'}/> 
                        </div>
                        
                        :
                        <DefaultTable COLUMNS={COLUMNS} DATA={data}></DefaultTable>
                }
                
        </body>
    )
}

export default ListarJovens;

