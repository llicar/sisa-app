import React from 'react';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { Form } from '../../components/form'
import Header from '../../components/header'
import { InputText } from '../../components/input'
import { InputContainer } from '../../components/inputContainer'
import { Title } from '../../components/title'
import FormNote from '../../components/formNote'
import ModalForm from '../../components/modal'
import { useModal } from '../../contexts/modalContext';

import EmpresaService from '../../services/empresas'
import JovemService from '../../services/jovens'
import dataFormat from "../../utils/dataFormat"
import getDirtyValues from '../../utils/getDirtyValues'



yup.setLocale({
    mixed: {
        required: 'Campo obrigatório'
    }
})


const validationSchema = yup.object().shape({

    nome: yup
        .string()
        .required(),
    sexo: yup
        .string()
        .required(),
    empresa_id: yup
        .string()
        .required(),
    matri_scfv: yup
        .string()
        .required(),
    dia_ap: yup
        .string()
        .required(),
    admissao: yup
        .string()
        .required(),
    orientador: yup
        .string()
        .required(),
    jornada: yup
        .string()
        .required(),
    inicial: yup
        .string()
        .required(),
})


const DadosCadastrais = () => {

    const params = useParams();

    const [empresas, setEmpresas] = useState([]);// Armazena as empresas
    const [jovem, setJovem] = useState([]);// Armazena os jovens
    const [datasFormatadas, setDatasFormatadas] = useState({}) //Armazena as datas formatadas
    const [dirtyValues, setDirtyValues] = useState([])// Armazena os valores alterados no formulario

    const {isModalVisible, setIsModalVisible} = useModal(); // Controla a visibilidade do modal
    const {isNoteVisible, setIsNoteVisible} = useModal();//Controla a visibilidade formulário de anotações
  
    const { 
        register, 
        handleSubmit, 
        errors,  
        formState,
        reset,
        formState: { isSubmitSuccessful } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const {dirtyFields } = formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...dirtyValues });
        }
    }, [isSubmitSuccessful, dirtyValues, reset]);

    //Buscando empresas na API 
    useEffect(() => {
        async function buscarDados(){
           const response =  await EmpresaService.index()

           setEmpresas(response.data)
        }

        buscarDados();
    }, [])

    //Buscando jovens na API
    useEffect(() => {
        async function buscarDados(){
           const response =  await JovemService.show(params.id)
           setJovem(response.data[0])

           //Formatando datas
           const datas = {
               isoAdmissao: dataFormat.iso(response.data[0].admissao)
           }
           setDatasFormatadas(datas)
        }
        buscarDados();
    }, [params.id])

    /**
    * Captura dos dados do formulario e insere no estado {FormData}
    * @param {*} data dados do formulário
    */
     function handleModal(data) {
        setDirtyValues(getDirtyValues(dirtyFields, data))
        setIsNoteVisible(true)
        setIsModalVisible(true)
    }


    return (

        <body>
            <Header />
            <Title>
                <h1>{jovem.nome}</h1>
            </Title>
                <Form id="form" onSubmit={handleSubmit(handleModal)}>
                    <h2>
                        Dados
                    </h2>
                    <hr />

                    <InputContainer>
                        <InputText w={55}>
                            <label>Nome</label>
                            <input name='nome' defaultValue={jovem.nome} ref={register} />
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
                            <input name='matri_scfv' defaultValue={jovem.matri_scfv} ref={register({ required: true })} />
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
                            <label>Admissão</label>
                            <input name='admissao' defaultValue={datasFormatadas.isoAdmissao} type="date" ref={register({ required: true })} />
                            <span className="erro"> {errors.admissao?.message} </span>
                        </InputText>

                    </InputContainer>

                    <InputContainer>
                        <InputText w={55}>
                            <label>Orientador</label>
                            <input name='orientador' defaultValue={jovem.orientador} ref={register({ required: true })} />
                            <span className="erro"> {errors.orientador?.message} </span>
                        </InputText>

                        <InputText w={35}>
                            <label>Jornada</label>
                            <input name='jornada' defaultValue={jovem.jornada} ref={register} />
                            <span className="erro"> {errors.jornada?.message} </span>
                        </InputText>
                    </InputContainer>

                    <InputContainer>
                        <InputText w={100}>
                            <label>Formação Inicial</label>
                            <input name='inicial' defaultValue={jovem.inicial} ref={register({ required: true })} />
                            <span className="erro"> {errors.inicial?.message} </span>
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

                    <input type="submit" value="Enviar" />
                </Form>
        
                 { isModalVisible ? // verifica se o modal é pra estar visivel
                    <ModalForm
                        title={'Tudo Certo?'}
                        service={JovemService.update2}
                        data={dirtyValues}
                        paramId={params.id}
                        type={'note'}
                    >
                        {
                            isNoteVisible ? // verifica se o formulário de anotações é pra estar visivel
                                <FormNote/>
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
                    </ModalForm> 
                    : false}
        </body>

    )
}

export default DadosCadastrais;

