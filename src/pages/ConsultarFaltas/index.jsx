import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import FaltasService from '../../services/faltas'
import dataFormat from "../../utils/dataFormat"
import SquareLoader from "react-spinners/SquareLoader";
import SubmitButton from '../../components/SubmitButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormatCase from '../../utils/formatCase'

import md5 from 'md5';


import Header from '../../components/header'
import DefaultTable from "../../components/Tables/DefaultTable"
import { Container } from './style.js'
import ModalFalta from '../../components/ModalFalta'
import { useModal } from '../../contexts/modalContext';
import Time from '../../utils/timeConvert.js'
import { InputFile,Submit } from "../../components/input";
import { InputFileContainer } from '../../components/inputContainer'

import { DateRangeColumnFilter } from '../../components/Tables/filters/RangeFilter'
import Filter from '../../components/Tables/filters/filter'
import SelectColumnFilter from '../../components/Tables/filters/SelectColumnFilter'

import análise from '../../assets/images/análise.png'
import abonar from '../../assets/images/abonar.png'
import descontar from '../../assets/images/descontar.png'
import details from '../../assets/images/details.png'
import ClipLoader from "react-spinners/ClipLoader";

import excluirIcon from '../../assets/icons/excluir.png'

import Lottie from "lottie-react";
import animationLogo from '../../assets/animationLogo.json'

const ConsultarFatas = () => {

    const [data, setData] = useState([]);
    const [att,setAtt] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [faltaSelecionada, setFaltaSelecionada] = useState([]);
    const { isModalVisible, setIsModalVisible } = useModal(false);//Controla a visibilidade do modal
    const [TempoFalta, setTempoFalta] = useState([]);
    const [atualizaDados,setAtualizaDados] = useState(false);
    const [fileName, setFileName] = useState('Clique para selecionar...');//Controla o nome que aparecera no Input File
    const [loadingButton,setloadingButton] = useState([0,'']); // Controla a visibilidade do loading dos botões submit

    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful }} = useForm({}); // Declarando variáveis para o funcionamento do formulário

    const statusIcons = {
        análise,
        descontar,
        abonar,
    }

    const COLUMNS = [

        {
            accessor: 'excluir',
            Filter,
            disableFilters: true
          },

        {
            Header: 'NOME',
            accessor: 'nome',
            Filter
        },
        {
            Header: 'DATA',
            accessor: 'data',
            Filter: DateRangeColumnFilter,
            filter: "dateBetween",
        },
        {
            accessor: 'dataExportar',
            Filter,
            disableFilters: true
        },
        {
            Header: 'EMPRESA',
            accessor: 'empresa',
            Filter
        },
        {
            Header: 'STATUS',
            accessor: 'status',
            Filter: SelectColumnFilter,
            filter: "includes"
        },
        {
            accessor: 'statusIcon',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'periodo',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'tempo',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'atividade',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'minutos',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'horas',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'desconto',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'salario',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'tipo_salario',
            Filter,
            disableFilters: true
        },
        {
            accessor: 'carga_horaria',
            Filter,
            disableFilters: true
        },
        
    ];

    const atualizadoNotif = () => toast("Atualizado com suscesso :D",{type:'success',theme: "colored"})
    const deletadoNotif = () => toast("Falta removida ❌",{type:'default',theme: "colored"})
    const erroNotif = () => toast("Não foi possivel atualizar :(",{type:'error',theme: "colored"})

    //Buscando falta por id
    async function buscarDados(idFalta) {
        const response = await FaltasService.buscarFaltaPorId(idFalta)
        setFaltaSelecionada(response.data[0])
        setTempoFalta(Time.MinutesForHours(response.data[0].horas_falta))
    }

    const HandleModalFalta = async (idFalta) => {
        await buscarDados(idFalta)
        setIsModalVisible(true)
    }

    /**
     * Deletar falta
     * @param {string} idFalta
     */

    async function handleDeletarFalta(idFalta) {
        try{
            await FaltasService.deletarFalta(idFalta)
            deletadoNotif()
            setAtt(!att)
        }catch(e){
            erroNotif()
        }
        
    }

     /** 
     * Atualiza falta
     * @param {*} data
     */
      async function handleAtualizar(data) {
        
        const Data = new FormData() 

        if(data.atestado){
            setloadingButton([1,'atestado'])
            //Tratando nome do atestado
            const md5Atestado = md5(data.atestado[0].name); //criando hash md5 com o nome do arquivo
            const typeFile = data.atestado[0].name.split(".").pop();//capturando o tipo do arquivo
            var atestadoHash = `${md5Atestado}.${typeFile}`; //criando hash com o (nome md5).(tipo do arquivo)
            
            Data.append('atestado', data.atestado[0])
            Data.append('nomeAtestado', atestadoHash)

        } else{
            Data.append('status_falta',data)
            setloadingButton([1,data])
        }

        try{
            await FaltasService.atualizarFalta(Data,faltaSelecionada.id_falta)
            setAtualizaDados(!atualizaDados)
            setloadingButton([0])
            setFileName('Clique para selecionar...')
            atualizadoNotif()
            setAtt(!att)
        }catch(e){
            erroNotif() 
        }
    }
    useEffect(() => {

        setShowLoader(true);
        FaltasService.index()
            .then(response => {
                const newData = response.data.map((response,i) => {
                    const newObg =
                    {
                        excluir: 
                            <button className={'btn-excluir'} onClick={() => handleDeletarFalta(response.id_falta) }>
                                  <img style={{width: '25px'}} alt="exluir" src={excluirIcon}/>
                            </button>,
                        nome: response.nome,
                        empresa: response.nome_fantasia,
                        dataExportar:response.data_falta,
                        data: dataFormat.fullDateBR(response.data_falta),
                        status: response.status_falta,
                        statusIcon: 
                            <div key={i} className={'ContainerStatus'}>
                                <img className={'DetalheFalta'}
                                    onClick={() => HandleModalFalta(response.id_falta)}
                                    alt="ver detalhes"
                                    src={details}>
                                </img>
                                <img
                                    className={'StatusFalta'}
                                    alt={response.status_falta}
                                    src={statusIcons[response.status_falta]} />
                            </div>,
                        periodo:response.periodo_falta,
                        tempo:response.horas_falta,
                        atividade:response.atividade,
                        minutos:null,
                        horas:null,
                        desconto:null,
                        salario:response.salario,
                        tipo_salario:response.tipo_salario,
                        carga_horaria:response.carga_horaria,


                    }
                    return newObg;
                })
                setData(newData);
                setShowLoader(false);
            })
    }, [att])

   

    return (
        <body>
            <Header />
            {
                showLoader ?
                    <div className="loader" style={{width:'150px'}}>
                        <Lottie animationData={animationLogo} loop={true} />
                    </div>

                    :
                    <Container>
                        <DefaultTable COLUMNS={COLUMNS} DATA={data} STATE={att}></DefaultTable>
                        <div className="detalhesFalta"></div>
                    </Container>

            }
            {isModalVisible ?
                <ModalFalta
                    title={faltaSelecionada.nome}
                    statusFalta={faltaSelecionada.status_falta}
                >
                    <div className="titleFalta">
                        <h2>{faltaSelecionada.nome}</h2>
                        <h2>{dataFormat.fullDateBR(faltaSelecionada.data_falta)}</h2>
                    </div>
                    <hr/>
                    <div className="containerFalta">
                        <div className="infoFalta">
                            <div className="groupTextInfo">
                                <label>Estado</label>
                                <p className="statusText">{faltaSelecionada.status_falta}</p>
                            </div>
                            <div className="groupTextInfo" >
                                <label>Periodo</label>
                                <p>{faltaSelecionada.periodo_falta === 'dia' ?
                                    'Dia completo' : TempoFalta[0] + ':' + TempoFalta[1]+' horas'
                                }
                                </p>
                            </div>
                            
                            <div className="groupTextInfo">
                                <label>Atividade do dia</label>
                            <p>{faltaSelecionada.atividade==='curso' ? 'Curso' : 'Trabalho'}</p>
                            </div> 
                        
                        </div>

                        <div className="infoFalta2">
                        
                            <div className="groupTextInfo">
                                <label>Descrição</label>
                                <p>{faltaSelecionada.detalhes}</p>
                            </div>
                            <div className="groupTextInfo">
                                <label>Lançado por</label>
                                <p>{FormatCase(faltaSelecionada.nome_usuario)}</p>
                            </div>
                            <div class="containerAtestado">   
                                <div className="groupTextInfo">
                                    <label>Atestado médico</label>
                                    <p>
                                        <a className="linkAtestado" target="_blank" 
                                            rel="noreferrer" 
                                            href={`${process.env.REACT_APP_S3_URL}${'atestados/'+faltaSelecionada.atestado}`}>
                                                Acessar
                                        </a>
                                    </p>
                                </div>     
                                <form className="formAtestado"  enctype="multipart/form-data" onSubmit={handleSubmit(handleAtualizar)}>
                                    <InputFileContainer>
                                        <InputFile w={75} style={{margin:'0 left'}}>
                                            <label>Enviar Atestado</label>
                                            <input
                                                type="file"
                                                name="atestado"
                                                onChange={event =>
                                                    setFileName(event.target.value)}
                                                id="atestado"
                                                ref={register}
                                            />
                                            <label className="file" for="atestado">{fileName.split('C:\\fakepath\\')}</label>
                                        </InputFile>

                                        {
                                            fileName==='Clique para selecionar...'?
                                            false:
                                            <SubmitButton w={90} h={38} color={'#1EC3BA'} id={'atestado'} loading={loadingButton}>
                                                    <input type="submit" value="Enviar" />
                                             </SubmitButton>  
                                        }
                                            
                                    </InputFileContainer>
                                </form>  
                            </div> 
                        </div>

                    </div>

                       
                    <div className="actionFalta">
                        <SubmitButton w={120} h={35} color={'#1EC3BA'} id={'abonar'} loading={loadingButton}>
                            <button onClick={() => handleAtualizar('abonar')}>Abonar</button>
                        </SubmitButton>
                        <SubmitButton style={{marginLeft:'30px'}} w={120} h={35} color={'#F16C6C'} id={'descontar'} loading={loadingButton}>
                            <button onClick={() => handleAtualizar('descontar')}>Descontar</button>
                        </SubmitButton>
                    </div>
                </ModalFalta>
                : false}
        </body>
    )
}

export default ConsultarFatas;

