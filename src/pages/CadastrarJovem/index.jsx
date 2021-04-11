import React from 'react';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useState, useEffect } from 'react';

import { Form } from '../../components/form'
import Header from '../../components/header'
import { InputText } from '../../components/input'
import { InputContainer } from '../../components/inputContainer'
import { Title } from '../../components/title'

import EmpresaService from '../../services/empresas'
import JovemService from '../../services/jovens'
import ModalForm from '../../components/modal'


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


const CadastrarJovem = () => {

    const [formData, setFormData] = useState(""); // Armazena os dados do formulário
    const [empresas, setEmpresas] = useState([]);// Armazena as empresas

    const [isModalVisible, setIsModalVisible] = useState(false); // Controla a visibilidade do modal
    
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

    //Buscando empresas na API
    useEffect(() => {
        async function buscarDados(){
           const response =  await EmpresaService.index()

           setEmpresas(response.data)
        }

        buscarDados();
    }, [])

    /**
    * Captura dos dados do formulario e insere no estado {FormData}
    * @param {*} data dados do formulário
    */
    function handleModal(data) {
        setFormData(data);
        setIsModalVisible(true);
    }

    return (

        <body>
            <Header />
            <Title>
                <h1>Nova admissão</h1>
            </Title>
                <Form id="form" onSubmit={handleSubmit(handleModal)}>
                    <h2>
                        Dados
                    </h2>
                    <hr />

                    <InputContainer>
                        <InputText w={55}>
                            <label>Nome</label>
                            <input name='nome' ref={register} />
                            <span className="erro"> {errors.nome?.message} </span>
                        </InputText>

                        <InputText w={35}>
                            <label>Sexo</label>
                            <select name='sexo' ref={register}>
                                <option value="" >Selecione...</option>
                                <option value="M" >MASCULINO</option>
                                <option value="F">FEMININO</option>
                            </select>
                            <span className="erro"> {errors.sexo?.message} </span>
                        </InputText>
                    </InputContainer>


                    <InputContainer>
                        <InputText w={55}>
                            <label>Empresa</label>
                            <select name="empresa_id" ref={register}>
                                <option value="">Selecione...</option>
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
                            <Controller as={InputMask} control={control} mask="99.999" name='matri_scfv' ref={register} />
                            <span className="erro"> {errors.matri_scfv?.message} </span>
                        </InputText>
                    </InputContainer>



                    <InputContainer>
                        <InputText w={55}>
                            <label>Dia de curso</label>
                            <select name="dia_ap" ref={register}>
                                <option value="" >Selecione...</option>
                                <option value="TERÇA-FEIRA" >TERÇA-FEIRA</option>
                                <option value="QUARTA-FEIRA">QUARTA-FEIRA</option>
                                <option value="QUINTA-FEIRA">QUINTA-FEIRA</option>
                                <option value="SEXTA-FEIRA">SEXTA-FEIRA</option>
                            </select>
                            <span className="erro"> {errors.dia_ap?.message} </span>
                        </InputText>

                        <InputText w={35}>
                            <label>Admissão</label>
                            <input name='admissao' type="date" ref={register({ required: true })} />
                            <span className="erro"> {errors.admissao?.message} </span>
                        </InputText>

                    </InputContainer>

                    <InputContainer>
                        <InputText w={55}>
                            <label>Orientador</label>
                            <input name='orientador' ref={register({ required: true })} />
                            <span className="erro"> {errors.orientador?.message} </span>
                        </InputText>

                        <InputText w={35}>
                            <label>Jornada</label>
                            <Controller as={InputMask} control={control} mask="99:99 - 99:99" name='jornada' ref={register} />
                            <span className="erro"> {errors.jornada?.message} </span>
                        </InputText>
                    </InputContainer>

                    <InputContainer>
                        <InputText w={100}>
                            <label>Formação Inicial</label>
                            <input name='inicial' ref={register({ required: true })} />
                            <span className="erro"> {errors.inicial?.message} </span>
                        </InputText>
                    </InputContainer>

                    <InputContainer>
                        <InputText w={45}>
                            <label>Treinamento</label>
                            <select name="treinamento" ref={register}>
                                <option value="" >Selecione...</option>
                                <option value="SIM" >SIM</option>
                                <option value="NAO">NÃO</option>
                            </select>
                            <span className="erro"> {errors.treinamento?.message} </span>
                        </InputText>

                        <InputText w={45}>
                            <label>Captação</label>
                            <select name="captacao" ref={register}>
                                <option value="" >Selecione...</option>
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
                    service={JovemService.create}
                    data={formData}
                    onClose={() => {
                        setIsModalVisible(false)
                    }}
                >
                            <div className="resumoContainer">                             
                                <div className="tag">
                                <h2>Nome</h2>
                                <h2>Admissão</h2>
                                <h2>Curso</h2>
                                <h2>Jornada</h2>
                                </div>

                                <div className="data">
                                <h2>{formData.nome}</h2>
                                <h2>{formData.admissao}</h2>
                                <h2>{formData.dia_ap}</h2>
                                <h2>{formData.jornada}</h2>
                                </div>
                            </div>
                </ModalForm> 
                : false}
        </body>

    )
}

export default CadastrarJovem;

