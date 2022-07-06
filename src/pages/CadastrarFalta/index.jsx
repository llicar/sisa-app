import React from 'react';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import md5 from 'md5';
import {isValid} from 'date-fns'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '../../components/form'
import Header from '../../components/header'
import { InputText } from '../../components/input'
import { InputContainer } from '../../components/inputContainer'
import { Title } from '../../components/title'

import { IoArrowRedoSharp } from 'react-icons/io5'
import { IoArrowUndoSharp } from 'react-icons/io5'


import { IoCalendarOutline } from 'react-icons/io5'


import JovemService from '../../services/jovens'
import FaltasService from '../../services/faltas'
import ModalForm from '../../components/modal'
import dataFormat from '../../utils/dataFormat'
import { useModal } from '../../contexts/modalContext';


yup.setLocale({
    mixed: {
        required: 'Campo obrigatório',
    },

    date:{
        default: 'Campo Inválido'
    },

    number:{
        max:'Máximo 6'
    }
})


const CadastrarFalta = () => {

    const today = new Date()

    const [jovens, setJovens] = useState([]);//Armazena dados do jovem vindo da API
    const [formData, setFormData] = useState("");//Armazena os dados prontos para enviar para a API
    const [modalType, setModalType] = useState('default');//Armazena o estado que define se é para fazer uma anotação ou não
    const [JovemSelecionado,setJovemSelecionado] = useState("");
    const [isTimeVisible,setIsTimeVisible] = useState("");
    const [dataFalta,setDataFalta] = useState(today);
    const [isDataFinalVisible,setIsDataFinalVisible] = useState(false);
    const {isModalVisible, setIsModalVisible} = useModal(false);//Controla a visibilidade do modal
    const [fileName, setFileName] = useState('Clique para selecionar');//Controla o nome que aparecera no Input File



    const validationSchema = yup.object().shape({

        jovem_id: yup
            .string()
            .required(),
    
        data_falta: yup
            .string()
            .required(),
    
        periodo_falta: yup
            .string()
            .required(),
    
        status_falta: yup
            .string()
            .required(),
    
        atividade: yup
            .string()
            .required(),

        horas_falta: yup
            .number()
            .typeError('Valor inválido')
            .moreThan(0,'Valor inválido')
            .lessThan(7,'Máximo 6 horas'),

        minutos_falta: yup
        .number()
        .nullable(true)
        .transform((curr, orig) => orig === '' ? null : curr)
        .default(undefined)
        .typeError('Valor inválido')
        .moreThan(0,'Valor inválido')
        .lessThan(60,'Máximo 59 minutos'),
            
        data_ultima_falta: 
            yup
            .date()
            .typeError('Data inválida')
            .test(
                'DataMinima',
                'Precisa ser maior que a data inicial',
                (value, context) => {
                    if(isDataFinalVisible){
                        const DataFinal = new Date(value)
                        const DataInicial = new Date(dataFalta) 
                        return DataFinal.getTime() > DataInicial.getTime()+86400000
                    }else
                    return true
                }
            ).test(
                'DataMaxima',
                'Período máximo de 15 dias',
                (value, context) => {
                    if(isDataFinalVisible){
                        const DataFinal = new Date(value)
                        const DataInicial = new Date(dataFalta) 
                        return (DataFinal.getTime() - DataInicial.getTime()) < 1296000000
                    }else
                    return true
                    
                }
            )
            
            
    })
   
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

   
    //Buscando jovem na api pelo id da requisição
    useEffect(() => {
        async function buscarDados(){
            const response = await JovemService.index()
            setJovens(response.data);
        }
        buscarDados();
    },[])

   /**
    * Captura dos dados do formulario e insere no estado {FormData}
    * @param {*} data dados do formulário
    */
    function handleModal(data) {

        const Data = new FormData() 

        if(data.atestado[0]){
            //Tratando nome do calendario
            const md5Atestado = md5(data.atestado[0].name); //criando hash md5 com o nome do arquivo
            const typeFile = data.atestado[0].name.split(".").pop();//capturando o tipo do arquivo
            var atestadoHash = `${md5Atestado}.${typeFile}`; //criando hash com o (nome md5).(tipo do arquivo)

            Data.append('atestado', data.atestado[0])
            Data.append('nomeAtestado', atestadoHash)
        } 
        
        const tempo_falta = (parseInt(data.horas_falta) * 60) + parseInt(data.minutos_falta)
        const userId = localStorage.getItem('@sisa-app/user_id')

        Data.append('jovem_id',data.jovem_id)
        Data.append('data_falta', data.data_falta)
        Data.append('data_ultima_falta', data.data_ultima_falta)
        Data.append('horas_falta', tempo_falta)
        Data.append('atividade', data.atividade)
        Data.append('status_falta', data.status_falta)
        Data.append('detalhes', data.detalhes)
        Data.append('periodo_falta', data.periodo_falta)
        Data.append('responsavel_falta', userId)
        
        
        setFormData(Data);
        setIsModalVisible(true);

        
    }
    //----------------------------------------------------------------

    return (

        <body>
            <Header />
            <Title>
                <h1>Registrar ausência</h1>
            </Title>

            <Form enctype="multipart/form-data" method="post" id="form" onSubmit={handleSubmit(handleModal)}>
                <InputContainer>
                    <InputText w={50}>
                        <label>Aprendiz</label>
                        <select name='jovem_id' ref={register}>
                            <option>Selecione...</option>
                        {
                            jovens.map((i)=>{
                                return(
                                    <option id={i.nome} onClick={ () => setJovemSelecionado(i.nome)} value={i.id_jovem}>{i.nome}</option>
                                )
                            })
                        }</select>
                        <span className="erro"> {errors.jovem_id?.message} </span>
                    </InputText>

                    <InputText w={isDataFinalVisible?20:40}>
                        <label 
                        className="labelDataAtestado" 
                        onClick={ () =>{setIsDataFinalVisible(!isDataFinalVisible)}}>
                            {
                                isDataFinalVisible?
                                <>
                                    Data Inicial&nbsp;
                                    <IoArrowUndoSharp/>
                                </>
                                :<>
                                    Data&nbsp;
                                    <IoArrowRedoSharp/>&nbsp;
                                    <IoCalendarOutline />
                                </>
                            }
                           
                            </label>
                        <input onBlur={(e) => e.target.value?setDataFalta(e.target.value) :false}name='data_falta' type="date" ref={register} />
                        <span className="erro"> {errors.data_falta?.message} </span>
                    </InputText>

                    { isDataFinalVisible?
                        <>
                            <InputText w={20}>
                                <label>Data final</label>
                                <input name='data_ultima_falta' type="date" ref={register} />
                                <span className="erro"> {errors.data_ultima_falta?.message} </span>
                            </InputText>
                        </>
                        : false
                    }
                    
                </InputContainer>

                <InputContainer>
                <InputText w={25}>
                        <label>Atividade do dia</label>
                        <select name='atividade' ref={register}>
                            <option value={'trabalho'}>Trabalho</option>
                            <option value={'curso'}>Curso</option>
                        </select>
                        <span className="erro"> {errors.atividade?.message} </span>
                    </InputText>

                    <InputText w={25}>
                        <label>Periodo de ausência</label>
                        <select name='periodo_falta' onBlur={(e) => {setIsTimeVisible(e.target.value)}} ref={register}>
                            <option value={'dia'}>Dia</option>
                            <option value={'horas'}>Horas</option>
                        </select>
                        <span className="erro"> {errors.periodo_falta?.message} </span>
                    </InputText>

                    { isTimeVisible==="horas"? 
                    <>
                        <InputText w={15}>
                            <label>Horas</label>
                            <input name='horas_falta' type="number" ref={register} />
                            <span className="erro"> {errors.horas_falta?.message} </span>
                        </InputText>
                        <InputText w={15}>
                            <label>Minutos</label>
                            <input name='minutos_falta' type="number" ref={register} />
                            <span className="erro"> {errors.minutos_falta?.message} </span>
                        </InputText>
                    </>
                    :
                    <>
                        <InputText w={15}>
                            <label style={{color:'grey'}}>Horas</label>
                            <input name='horas_falta' disabled type="number" ref={register} />
                            <span className="erro"> {errors.horas_falta?.message} </span>
                        </InputText>
                        <InputText w={15}>
                            <label style={{color:'grey'}}>Minutos</label>
                            <input name='minutos_falta' disabled type="number" ref={register} />
                            <span className="erro"> {errors.horas_falta?.message} </span>
                        </InputText>
                    </>
                    }

                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>Status</label>
                        <select name='status_falta' ref={register}>
                            <option value={"análise"}>Análise</option>
                            <option value={"abonar"}>Abonar</option>
                            <option value={"descontar"}>Descontar</option>
                        </select>
                        <span className="erro"> {errors.status_falta?.message} </span>
                        </InputText>

                        <InputText w={45}>
                        <label>Atestado</label>
                        <input
                            type="file"
                            name="atestado"
                            onChange={event =>
                                setFileName(event.target.value)}
                            id="atestado"
                            ref={register}
                            />
                        <label className="file" for="atestado">{fileName.split('C:\\fakepath\\')}</label>
                    </InputText> 
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Detalhes</label>
                        <textarea name='detalhes' ref={register} />
                        <span className="erro"> {errors.detalhes?.message} </span>
                    </InputText>
                </InputContainer>
               
                <input type="submit" value="Enviar" />

            </Form>

            { isModalVisible ? // verifica se o modal é pra estar visivel
                <ModalForm
                    title={'Tudo Certo?'}
                    service={FaltasService.create}
                    data={formData}
                    paramId={formData.get('jovem_id')}
                    type={modalType}
                >

                    {
                            <div className="resumoContainer">
                                <div className="tag">

                                    <h2>Nome</h2>
                                    <h2>Data da falta</h2>
                                    <h2>Atividade</h2>
                                    <h2>Periodo</h2>   
                                    <h2>Detalhes</h2>
                                    
                                </div>
                            
                                <div className="valuesInfo">

                                    <h2>{JovemSelecionado}</h2>
                                    <h2>{dataFormat.fullDateBR(formData.get('data_falta'))}{isValid(new Date(formData.get('data_ultima_falta')))? ` à ${dataFormat.fullDateBR(formData.get('data_ultima_falta'))}` : false}</h2>
                                    <h2>{formData.get('atividade')}</h2>
                                    <h2>{formData.get('periodo_falta')}</h2>
                                    <h2>{formData.get('detalhes')}</h2>
                                    
                                </div>
                            </div>
                    }


                </ModalForm> 
                : false}
            

        </body>
               
               
    )
    
}

export default CadastrarFalta;
