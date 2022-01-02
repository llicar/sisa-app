
import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import { CgArrowRightR } from "react-icons/cg";

import Header from '../../components/header'
import DataTable from '../../components/DataTable'
import JovemService from '../../services/jovens'
import dataFormat from "../../utils/dataFormat"
import DotLoader from "react-spinners/DotLoader";
import style from './style.css'


const ListarJovens = () => {
    
    const [data,setData] = useState([]);
    const [showLoader,setShowLoader] = useState(true);

    useEffect(() => {
        JovemService.index()
        .then( response => {
            setShowLoader(false);
            const newData = response.data.map( (response) => {
                const newObg = 
                    {
                        ID: response.id_jovem,
                        Nome: response.nome,
                        Admissao: dataFormat.fullDateBR(response.admissao),
                        Empresa: response.nome_fantasia,
                        Detalhes: <Link to={`/DetalheJovem/${response.id_jovem}`}><CgArrowRightR  className="linkArrow"/></Link>
                       
                    }
                
                return newObg;
            })
            setData(newData);
        })
    },[])  

    return (
        <body>
            <Header/>
          
                {
                    showLoader?
                        <div className="loader">
                        <DotLoader color={'#1EC3BA'}/> 
                        </div>
                        
                        :
                        <DataTable data={data}></DataTable>
                }
                
        </body>
    )
}

export default ListarJovens;

