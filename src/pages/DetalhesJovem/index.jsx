import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import dotenv from 'dotenv';

import { useForm } from 'react-hook-form'

import * as yup from 'yup';
import generateDocument from '../../utils/docGenerator'
import ReactCepPromise from "react-cep-promise";
import md5 from 'md5';

import Header from '../../components/header'
import { Form } from '../../components/form'
import ModalForm from '../../components/modal'

import { InputContainer } from '../../components/inputContainer'
import { LinkMenu as DocButton } from "../home/style";
import { InputText } from "../../components/input";
import FormNote from '../../components/formNote'

import EmpresaService from '../../services/empresas'
import JovemService from '../../services/jovens'
import dataFormat from "../../utils/dataFormat"
import getDirtyValues from '../../utils/getDirtyValues'
import estados from '../../utils/estados.json'
import BeatLoader from "react-spinners/BeatLoader";

import style from './style.css'

dotenv.config();

yup.setLocale({
    mixed: {
        required: 'Campo obrigatório'
    }
})

const DetalheJovem = () => {
    const params = useParams();

    const [fetching, setFetching] = useState(false); // Nescessário para o funcionamento do ReactCepPromisse
    const [cep, setCep] = useState("");// Armazena o CEP vindo da função de buscar CEP
    const [city, setCity] = useState("")// Cidade
    const [state, setState] = useState("");// Estado
    const [neighborhood, setNeighborhood] = useState("");// Bairro
    const [street, setStreet] = useState("");// Rua
    const [jovem, setJovem] = useState([{}]); // Armazena os dados do jovem
    const [anotacao, setAnotacao] = useState({});//Armazena os dados da anotação feita
    const [dirtyValues, setDirtyValues] = useState([]) // Armazena os campos alterados
    const [anotacoes, setAnotacoes] = useState([{}]); // Armazena as anotações do jovem
    const [etapaJovem,setEtapaJovem] = useState(true); // Armazena a etapa jovem
    const [empresas, setEmpresas] = useState([{}]) // Armazena as empresas
    const [datasFormatadas, setDatasFormatadas] = useState({}) // Armazena as datas formatadas

    const [isModalVisible, setIsModalVisible] = useState(false);// Controla a visibilidade do modal
    const [isNoteVisible, setIsNoteVisible] = useState(false);//Controla a visibilidade formulário de anotações
    const [loadingCalendario,setLoadingCalendario] = useState(false); // Controla a visibilidade do loading do calendario
    const [fileName, setFileName] = useState('Clique para selecionar');//Controla o nome que aparecera no Input File

    /**
     * Preenche os estados dos campos de endereço após o componente 
     * ReactCepPromise buscar os dados na api 
     * @param {} result 
     */
    function onResultCep(result) {

        const { data, error } = result;

        if (data) {
            setCep(data.cep);
            setCity(data.city);
            setState(data.state);
            setNeighborhood(data.neighborhood);
            setStreet(data.street);

        }

        if (error) {
            alert(error);

            setCity("");
            setState("");
            setNeighborhood("");
            setStreet("");
        }
    }

    //Buscando empresas na API
    useEffect(() => {
        async function buscarDados(){
            const response = await  EmpresaService.index()
            setEmpresas(response.data)
        }

        buscarDados();
    }, [])

    //Buscando anotações do jovem na API
    useEffect(() => {
        async function buscarDados(){
            const reponse = await JovemService.showNotes(params.id)
            setAnotacao(reponse.data)
        }

        buscarDados();
    }, [params.id])

    //Buscando dados do jovem na API
    useEffect(() => {
        async function buscarDados(){
            const response = await JovemService.show(params.id)
            setJovem(response.data[0]);

            //Formatando datas
            const datas = {
                data_nascimento: dataFormat.fullDateBR(response.data[0].data_nascimento),
                emissao_rg: dataFormat.fullDateBR(response.data[0].emissao_rg),

                admissao: dataFormat.fullDateBR(response.data[0].admissao),
                diaAdmissao: dataFormat.day(response.data[0].admissao),
                mesCompletoAdmissao: dataFormat.fullMonth(response.data[0].admissao),
                anoAdmissao: dataFormat.year(response.data[0].admissao),

                demissao: dataFormat.fullDateBR(response.data[0].demissao),
                diaDemissao: dataFormat.day(response.data[0].demissao),
                mesCompletoDemissao: dataFormat.fullMonth(response.data[0].demissao),
                anoDemissao: dataFormat.year(response.data[0].demissao),

                oficio: dataFormat.fullDateBR(response.data[0].data_oficio),
                diaOficio: dataFormat.day(response.data[0].data_oficio),
                mesCompletoOficio: dataFormat.fullMonth(response.data[0].data_oficio),
                anoOficio: dataFormat.year(response.data[0].data_oficio),

                isoAdmissao: dataFormat.iso(response.data[0].admissao),
                isoInicioEmp: dataFormat.iso(response.data[0].inicio_emp),
                isoTerminoEmp: dataFormat.iso(response.data[0].termino_emp),
                isoDemissao: dataFormat.iso(response.data[0].demissao),
                isoEmissaoRg: dataFormat.iso(response.data[0].emissao_rg),
                isoDataOficio: dataFormat.iso(response.data[0].data_oficio),
                isoDataNascimento: dataFormat.iso(response.data[0].data_nascimento)
            }
            setDatasFormatadas(datas)
        }

        buscarDados();
        
    }, [params.id,etapaJovem])

    /**
     * Tratando formulário ------------------
     */
    const {
        register,
        handleSubmit,
        errors,
        formState,
        reset,
        formState: { isSubmitSuccessful }} = useForm({}); // Declarando variáveis para o funcionamento do formulário

    const { isDirty, dirtyFields } = formState; // Variaveis do formState que captura os campos alterados no formulário

    /**
     * Resetando a variavel de campos alterados alterados 
     * quando submeter o formulário
     */
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...dirtyValues });
        }
    }, [isSubmitSuccessful, dirtyValues, reset]); 

    /**
    * Captura todos os dados do formulário e insere apenas os alterados no estado {DirtyValues}
    * Abre modal
    * @param {*} data dados do formulário
    */
    function handleModal(data) {

        setDirtyValues(getDirtyValues(dirtyFields, data))
        setIsModalVisible(true)

    }

    /**
     * Captura dos dados do formulario de anotações e insere no estado {Anotacoes}
     * @param {*} data dados do formulário de anotações
     */
    function handleAnotacao(data) {
        setIsNoteVisible(false)
        setAnotacao(data)
    }

    /**
     * Faz upload do calendário para alteração
     * @param {*} data 
     */
    async function handleCalendario(data) {
        
        setLoadingCalendario(true)
        console.log('a')

        //Tratando nome do calendario
        const md5Calendar = md5(data.calendario[0].name); //criando hash md5 com o nome do arquivo
        const typeFile = data.calendario[0].name.split(".");//capturando o tipo do arquivo
        const hashCalendarName = `${md5Calendar}.${typeFile[1]}`; //criando hash com o (nome md5).(tipo do arquivo)

        const Data = new FormData() 

        Data.append('calendario', data.calendario[0])
        Data.append('calendarName', hashCalendarName)

        try{
            await JovemService.update1(Data,params.id)
            setLoadingCalendario(false)
            alert("Calendario Atualizado!")
        }catch(e){
            alert("Falha ao enviar calendário")
        }
    }


    return (
        <body>
            <Header />

            {/* ------------------ CONTAINER DE INFORMAÇÕES ------------------ */}

            <div className="detalhesContainer">
                <div className="infoContainer">
                    <div className="cardContainer">
                        <h1>{jovem.nome}</h1>

                        <div className="cardResume card">
                            <div>
                                <h3>Empresa</h3>
                                <h4>{jovem.nome_fantasia}</h4>
                                <h3>Admissão</h3>
                                <h4>{datasFormatadas.admissao}</h4>
                            </div>
                        </div>

                        <div className="cardDocs card">
                            <div className="docs">
                                <h3>Documentos</h3>
                                <DocButton className="linkDoc" onClick={() => { generateDocument(jovem, 'comunicado', datasFormatadas) }} >Comunicado de admissão</DocButton>
                                <DocButton className="linkDoc" onClick={() =>{ generateDocument(jovem, 'carta', datasFormatadas)}}>Carta de encaminhamento</DocButton>
                                <a 
                                className="linkCalendario"
                                target="_blank" 
                                rel="noreferrer" 
                                href={`${process.env.CALENDARIO_URL}${jovem.calendario}`}>
                                    Calendário
                                </a>
                                <DocButton className="linkDoc" onClick={() =>{ generateDocument(jovem, 'oficio', datasFormatadas)}}>Oficio</DocButton>
                                <form className="form-calendario"  enctype="multipart/form-data" onSubmit={handleSubmit(handleCalendario)}>
                                    <InputContainer style={{width:'100%'}}>
                                        <InputText w={70}>
                                            <label>Alterar Calendário</label>
                                            <input
                                                type="file"
                                                name="calendario"
                                                onChange={event =>
                                                    setFileName(event.target.value)}
                                                id="calendario"
                                                ref={register}
                                                required />
                                            <label className="file" for="calendario">{fileName.split('C:\\fakepath\\')}</label>
                                        </InputText>
                                        <InputText w={25}>
                                            {
                                                loadingCalendario ?
                                                <div style={{marginTop:'30px',display:'flex',justifyContent: 'center'}}>
                                                    <BeatLoader  loading={loadingCalendario} color={'#1EC3BA'}/>
                                                </div>
                                                    
                                                : 
                                                    <input className="enviar-calendario" type="submit" value="Enviar"/> 
                                            }
                                        </InputText>
                                    </InputContainer>
                             </form>        
                            </div>

                            <div className="status">
                                <h3>Impressão</h3>
                                {
                                    jovem.etapa == 4 ?
                                        <h2>Finalizado</h2>
                                        : <div>
                                            <h2 style={{ color: '#FA5757' }}>Pendente</h2>
                                            <button className="buttonEtapa" onClick={async () => { 
                                                await JovemService.updateEtapa(params.id) 
                                                setEtapaJovem(!etapaJovem)
                                                }}>Finalizar</button>
                                        </div>
                                }
                               
                            </div>
                        </div>

                        <h3 className="notesTitle">Anotações</h3>

                        {
                            anotacoes.map(anotacoes => {
                                return (
                                    <div className="cardNotes card">
                                        <p className="title_notes">
                                            <strong>Titulo: </strong>
                                            {anotacoes.titulo}
                                        </p>
                                        <p className="data_notes">
                                            <strong>Data: </strong>
                                            {dataFormat.fullDateBR(anotacoes.data)}
                                        </p>
                                        <p className="description_notes">
                                            {anotacoes.descricao}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* ------------------ FORMULÁRIO DE DADOS ------------------ */}

                <div className="formContainer">
                    <Form id="form" className="formCompleto" onSubmit={handleSubmit(handleModal)}>
                        <h2>
                            Dados
                            </h2>
                        <hr />

                        <InputContainer>
                            <InputText w={55}>
                                <label>Nome</label>
                                <input name="nome" defaultValue={jovem.nome} ref={register} />
                                <span className="erro"> {errors.nome?.message} </span>
                            </InputText>

                            <InputText w={35}>
                                <label>Sexo</label>
                                {
                                    jovem.sexo == 'M' ?
                                        <select name='sexo' ref={register}>
                                            <option value={jovem.sexo} default disable >MASCULINO</option>
                                            <option value="F">FEMININO</option>
                                        </select> :
                                        <select name='sexo' defaultValue={jovem.sexo} ref={register}>
                                            <option value={jovem.sexo} default disable >FEMININO</option>
                                            <option value="M">MASCULINO</option>
                                        </select>
                                }
                                <span className="erro"> {errors.sexo?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={55}>
                                <label>Empresa</label>
                                <select name="empresa_id" ref={register}>
                                    <option default disable value={jovem.empresa_id}>{jovem.nome_fantasia}</option>
                                    {
                                        empresas.map(empresa => {
                                            return (
                                                <option value={empresa.id_empresa}>{empresa.nome_fantasia}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span className="erro"> {errors.empresa_id?.message} </span>
                            </InputText>

                            <InputText w={35}>
                                <label>Matricula</label>
                                <input name='matri_scfv' defaultValue={jovem.matri_scfv} ref={register} />
                                <span className="erro"> {errors.matri_scfv?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={55}>
                                <label>Dia de curso</label>
                                <select name="dia_ap" ref={register}>
                                    <option value={jovem.dia_ap} >{jovem.dia_ap}</option>
                                    <option value="TERÇA-FEIRA" >TERÇA-FEIRA</option>
                                    <option value="QUARTA-FEIRA">QUARTA-FEIRA</option>
                                    <option value="QUINTA-FEIRA">QUINTA-FEIRA</option>
                                    <option value="SEXTA-FEIRA">SEXTA-FEIRA</option>
                                </select>
                                <span className="erro"> {errors.dia_ap?.message} </span>
                            </InputText>

                            <InputText w={35}>
                                <label>Jornada</label>
                                <input defaultValue={jovem.jornada} name='jornada' ref={register} />
                                <span className="erro"> {errors.jornada?.message} </span>
                            </InputText>

                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Orientador</label>
                                <input name='orientador' defaultValue={jovem.orientador} ref={register({ required: true })} />
                                <span className="erro"> {errors.orientador?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>Treinamento</label>
                                <select name="treinamento" ref={register}>
                                    <option value={jovem.treinamento} >{jovem.treinamento}</option>
                                    <option value="SIM" >SIM</option>
                                    <option value="NAO">NÃO</option>
                                </select>
                                <span className="erro"> {errors.treinamento?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Captação</label>
                                <select name="captacao" ref={register}>
                                    <option value={jovem.captacao} >{jovem.captacao}</option>
                                    <option value="INTERNO">INTERNO</option>
                                    <option value="EXTERNO">EXTERNO</option>
                                </select>
                                <span className="erro"> {errors.captacao?.message} </span>
                            </InputText>
                        </InputContainer>

                        {/*--------*/<h2>Datas</h2>/*--------*/}
                        <hr />

                        <InputContainer>
                            <InputText w={45}>
                                <label>Admissão</label>
                                <input name='admissao' type="date" defaultValue={datasFormatadas.isoAdmissao} ref={register} />
                                <span className="erro"> {errors.admissao?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Inicio na empresa</label>
                                <input name='inicio_emp' type="date" defaultValue={datasFormatadas.isoInicioEmp} ref={register} />
                                <span className="erro"> {errors.inicio_emp?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>Saida da empresa</label>
                                <input name='termino_emp' type="date" defaultValue={datasFormatadas.isoTerminoEmp} ref={register} />
                                <span className="erro"> {errors.termino_emp?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Demissão</label>
                                <input name='demissao' type="date" defaultValue={datasFormatadas.isoDemissao} ref={register} />
                                <span className="erro"> {errors.demissao?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Formação Inicial</label>
                                <input name='inicial' defaultValue={jovem.inicial} ref={register({ required: true })} />
                                <span className="erro"> {errors.inicial?.message} </span>
                            </InputText>
                        </InputContainer>


                        {/*--------*/ <h2>Dados Pessoais</h2> /*---------*/}

                        <InputContainer>
                            <InputText w={45}>
                                <label>RG</label>
                                <input name='rg' defaultValue={jovem.rg} ref={register} />
                                <span className="erro"> {errors.rg?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Emissão</label>
                                <input name='emissao_rg' type="date" defaultValue={datasFormatadas.isoEmissaoRg} ref={register} />
                                <span className="erro"> {errors.emissao_rg?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>CPF</label>
                                <input name='cpf' defaultValue={jovem.cpf} ref={register} />
                                <span className="erro"> {errors.cpf?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Data de nascimento</label>
                                <input name='data_nascimento' type="date" defaultValue={datasFormatadas.isoDataNascimento} ref={register} />
                                <span className="erro"> {errors.data_nascimento?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={55}>
                                <label>Municipio de nascimento</label>
                                <input name='cidade_nascimento' defaultValue={jovem.cidade_nascimento} ref={register} />
                                <span className="erro"> {errors.cidade_nascimento?.message} </span>
                            </InputText>

                            <InputText w={35}>
                                <label>Estado</label>
                                <select name='estado_nascimento' ref={register}>
                                    <option value={jovem.estado_nascimento}>{jovem.estado_nascimento}</option>
                                    {
                                        estados.UF.map(estados => {
                                            return (
                                                <option value={estados.sigla}>{estados.nome}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span className="erro"> {errors.estado_nascimento?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Bilhete Unico</label>
                                <input name='bilhete_unico' defaultValue={jovem.bilhete_unico} ref={register} />
                                <span className="erro"> {errors.bilhete_unico?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>CTPS</label>
                                <input name='ctps' defaultValue={jovem.ctps} ref={register} />
                                <span className="erro"> {errors.ctps?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Série</label>
                                <input name='serie' defaultValue={jovem.serie} ref={register} />
                                <span className="erro"> {errors.serie?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>Telefone 1</label>
                                <input name='fone1' defaultValue={jovem.fone1} ref={register} />
                                <span className="erro"> {errors.fone1?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Telefone 2</label>
                                <input name='fone2' defaultValue={jovem.fone2} ref={register} />
                                <span className="erro"> {errors.fone2?.message} </span>
                            </InputText>
                        </InputContainer>

                        {/*--------*/<h2>Responsáveis</h2>/*--------*/}
                        <hr />

                        <InputContainer>
                            <InputText w={100}>
                                <label>Quem irá assinar a documentação?</label>
                                <select name='opc_responsavel' ref={register}>
                                    <option valeu={jovem.opc_responsavel}>{jovem.opc_responsavel}</option>
                                    <option valeu="mae">MÃE</option>
                                    <option valeu="pai">PAI</option>
                                    <option valeu="responsavel"> RESPOSÁVEL</option>
                                </select>
                                <span className="erro"> {errors.opc_responsavel?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Mãe</label>
                                <input name='mae' defaultValue={jovem.mae} ref={register} />
                                <span className="erro"> {errors.mae?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>CPF da Mãe</label>
                                <input name='cpf_mae' defaultValue={jovem.cpf_mae} ref={register} />
                                <span className="erro"> {errors.cpf_mae?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>RG da Mãe</label>
                                <input name='rg_mae' defaultValue={jovem.rg_mae} ref={register} />
                                <span className="erro"> {errors.rg_mae?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Pai</label>
                                <input name='pai' defaultValue={jovem.pai} ref={register} />
                                <span className="erro"> {errors.pai?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>CPF da Pai</label>
                                <input name='cpf_pai' defaultValue={jovem.cpf_pai} ref={register} />
                                <span className="erro"> {errors.cpf_pai?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>RG da Pai</label>
                                <input name='rg_pai' defaultValue={jovem.rg_pai} ref={register} />
                                <span className="erro"> {errors.cpf_pai?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Responsável Legal</label>
                                <p className='info'>* Só é nescessário preencher caso os pais não tiverem a guarda do jovem</p>
                                <input name='responsavel_legal' defaultValue={jovem.responsavel_legal} ref={register} />
                                <span className="erro"> {errors.responsavel_legal?.message} </span>

                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>CPF do Reponsável</label>
                                <input name='cpf_responsavel_legal' defaultValue={jovem.cpf_responsavel_legal} ref={register} />
                                <span className="erro"> {errors.cpf_responsavel_legal?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>RG do Responsável</label>
                                <input name='rg_responsavel_legal' defaultValue={jovem.rg_responsavel_legal} ref={register} />
                                <span className="erro"> {errors.rg_responsavel_legal?.message} </span>
                            </InputText>
                        </InputContainer>

                        {/*--------*/<h2>Endereço</h2>/*--------*/}
                        <hr />

                        <InputContainer>
                            <InputText w={25}>
                                <label>CEP</label>

                                <ReactCepPromise /* componente externo para buscar de endereço pelo CEP */
                                    id="cep"
                                    fetching={fetching}
                                    onChange={e => setCep(e.target.value)}
                                    onResult={onResultCep}
                                    setFetching={setFetching}
                                    placeholder={jovem.cep}
                                />
                                <input style={{ display: "none" }} name="cep" value={cep} ref={register}></input>
                                <span className="erro"> {errors.cep?.message} </span>
                            </InputText>

                            <InputText w={65}>
                                <label>Bairro</label>
                                <input id="neighborhood" placeholder={jovem.bairro} value={neighborhood} name='bairro' ref={register} />
                                <span className="erro"> {errors.bairro?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={65}>
                                <label>Logradouro</label>
                                <input id="street" placeholder={jovem.rua} value={street} name='rua' ref={register} />
                                <span className="erro"> {errors.rua?.message} </span>
                            </InputText>

                            <InputText w={25}>
                                <label>Numero</label>
                                <input name='numero' placeholder={jovem.numero} ref={register} />
                                <span className="erro"> {errors.numero?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={65}>
                                <label>Municipio</label>
                                <input id="city" placeholder={jovem.municipio} value={city} name='municipio' ref={register} />
                                <span className="erro"> {errors.municipio?.message} </span>
                            </InputText>

                            <InputText w={25}>
                                <label>Estado</label>
                                <input id="state" placeholder={jovem.uf} value={state} name='uf' ref={register} />
                                <span className="erro"> {errors.uf?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={30}>
                                <label>Complemento</label>
                                <input name='complemento' defaultValue={jovem.complemento} ref={register} />
                                <span className="erro"> {errors.complemento?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>Tempo de residência</label>
                                <input name='tempo_moradia' defaultValue={jovem.tempo_moradia} ref={register} />
                                <span className="erro"> {errors.tempo_moradia?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>Situação do imóvel</label>
                                <select name='sit_imovel' ref={register}>
                                    <option value={jovem.sit_imovel}>{jovem.sit_imovel}</option>
                                    <option value="proprio">Próprio</option>
                                    <option value="alugado">Alugado</option>
                                    <option value="cedido">Cedido</option>
                                    <option value="financiado">Financiado</option>
                                </select>
                                <span className="erro"> {errors.sit_imovel?.message} </span>
                            </InputText>
                        </InputContainer>

                        {/*--------*/<h2>Escolar</h2>/*----------*/}
                        <hr />

                        <InputContainer>
                            <InputText w={100}>
                                <label>Escola</label>
                                <input name='escola' defaultValue={jovem.escola} ref={register} />
                                <span className="erro"> {errors.escola?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={100}>
                                <label>Endereço da escola</label>
                                <input name='end_escola' defaultValue={jovem.end_escola} ref={register} />
                                <span className="erro"> {errors.end_escola?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={30}>
                                <label>Escolaridade</label>
                                <select name='escolaridade' ref={register}>
                                    <option value={jovem.escolaridade}>{jovem.escolaridade}</option>
                                    <option value="1 ANO">1 ANO</option>
                                    <option value="2 ANO">2 ANO</option>
                                    <option value="3 ANO">3 ANO</option>
                                    <option value="MEDIO COMPLETO">MÉDIO COMPLETO</option>
                                </select>
                                <span className="erro"> {errors.escolaridade?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>Periodo</label>
                                <select name='periodo' ref={register}>
                                    <option value={jovem.perido}>{jovem.periodo}</option>
                                    <option value="MANHÃ">MANHÃ</option>
                                    <option value="TARDE">TARDE</option>
                                    <option value="NOITE">NOITE</option>
                                </select>
                                <span className="erro"> {errors.periodo?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>RA</label>
                                <input name='ra' defaultValue={jovem.ra} ref={register} />
                                <span className="erro"> {errors.ra?.message} </span>
                            </InputText>
                        </InputContainer>

                        {/*---------*/<h2>Dados contratuais</h2>/*--------*/}
                        <hr />

                        <InputContainer>
                            <InputText w={30}>
                                <label>Matricula</label>
                                <input name='matri_ap' defaultValue={jovem.matri_ap} ref={register} />
                                <span className="erro"> {errors.matri_ap?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>J.A</label>
                                <input name='ja' defaultValue={jovem.ja} ref={register} />
                                <span className="erro"> {errors.ja?.message} </span>
                            </InputText>

                            <InputText w={30}>
                                <label>J.A.E</label>
                                <input name='jae' defaultValue={jovem.jae} ref={register} />
                                <span className="erro"> {errors.jae?.message} </span>
                            </InputText>
                        </InputContainer>

                        <InputContainer>
                            <InputText w={45}>
                                <label>Oficio</label>
                                <input name='oficio' defaultValue={jovem.oficio} ref={register} />
                                <span className="erro"> {errors.oficio?.message} </span>
                            </InputText>

                            <InputText w={45}>
                                <label>Data do oficio</label>
                                <input type="date" name='data_oficio' defaultValue={datasFormatadas.isoDataOficio} ref={register} />
                                <span className="erro"> {errors.data_oficio?.message} </span>
                            </InputText>
                        </InputContainer>
                        <input type="submit" value="Enviar" disabled={!isDirty} />
                    </Form> 
                </div>
            </div>

            { isModalVisible ?
                <ModalForm
                    title={'Alterar Dados?'}
                    onClose={() => {
                        setIsModalVisible(false)
                        setIsNoteVisible(true)
                    }}
                    paramId={params.id}
                    data={dirtyValues}
                    service={JovemService.update2}
                    serviceNote={JovemService.createNote}
                    dataNote={anotacao}
                    isNoteVisible={isNoteVisible}
                    isNote={true}
                    rFail="Ops, algo deu errado :("
                    rSuccess="Alterado com suscesso!!"
                >

                    {
                        isNoteVisible ?

                            <FormNote handleAnotacao={handleAnotacao} />

                            :

                            <div className="resumoContainer">
                                <div className="tag">
                                    {
                                        Object.keys(dirtyValues).map(key => {
                                            return <h2>{key}</h2>
                                        })
                                    }
                                </div>

                                <div className="valuesInfo">
                                    {
                                        Object.values(dirtyValues).map(value => {
                                            return <h2>{value}</h2>
                                        })
                                    }
                                </div>
                            </div>
                    }
                </ModalForm> :
                false
            }
        </body>
    )
}

export default DetalheJovem;