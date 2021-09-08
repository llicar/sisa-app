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
import dataFormat from '../../utils/dataFormat'
import { useModal } from '../../contexts/modalContext';


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
    mae: yup
        .string()
        .required(),
    pai: yup
        .string()
        .required(),
    escolaridade: yup
        .string()
        .required(),
})


const CadastrarJovem = () => {

    const [formData, setFormData] = useState(""); // Armazena os dados do formulário
    const [empresas, setEmpresas] = useState([]);// Armazena as empresas

    const {isModalVisible, setIsModalVisible} = useModal(); // Controla a visibilidade do modal
    
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
                            <label>Matricula SCFV</label>
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
                        <label>Chapa</label>
                        <input name='matri_ap' maxlength="6" ref={register} />
                        <span className="erro"> {errors.matri_ap?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>J.A</label>
                        <Controller as={InputMask} control={control} mask="99/999" name='ja' ref={register} />
                        <span className="erro"> {errors.ja?.message} </span>
                    </InputText>
                </InputContainer>

                    <InputContainer>
                        <InputText w={30}>
                            <label>Treinamento</label>
                            <select name="treinamento" ref={register}>
                                <option value="" >Selecione...</option>
                                <option value="SIM" >SIM</option>
                                <option value="NAO">NÃO</option>
                            </select>
                            <span className="erro"> {errors.treinamento?.message} </span>
                        </InputText>

                        <InputText w={30}>
                            <label>Captação</label>
                            <select name="captacao" ref={register}>
                                <option value="" >Selecione...</option>
                                <option value="INTERNO">INTERNO</option>
                                <option value="EXTERNO">EXTERNO</option>
                            </select>
                            <span className="erro"> {errors.captacao?.message} </span>
                        </InputText>

                        <InputText w={30}>
                        <label>Escolaridade</label>
                        <select name='escolaridade' ref={register}>
                            <option value="">Selecione...</option>
                            <option value="1 ANO">1 ANO</option>
                            <option value="2 ANO">2 ANO</option>
                            <option value="3 ANO">3 ANO</option>
                            <option value="MEDIO COMPLETO">MÉDIO COMPLETO</option>
                        </select>
                        <span className="erro"> {errors.escolaridade?.message} </span>
                    </InputText>

                    </InputContainer>

                    <h2>Responsáveis</h2>
                <hr />

                <InputContainer>
                    <InputText w={100}>
                        <label>Quem irá assinar a documentação?</label>
                        <select name='opc_responsavel' ref={register}>
                            <option valeu="">Selecione...</option>
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
                        <input name='mae' ref={register} />
                        <span className="erro"> {errors.mae?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>CPF da Mãe</label>
                        <Controller as={InputMask} control={control} mask="999.999.999-99" name='cpf_mae' ref={register} />
                        <span className="erro"> {errors.cpf_mae?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>RG da Mãe</label>
                        <input name='rg_mae' ref={register} />
                        <span className="erro"> {errors.rg_mae?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Pai</label>
                        <input name='pai' ref={register} />
                        <span className="erro"> {errors.pai?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>CPF da Pai</label>
                        <Controller as={InputMask} control={control} mask="999.999.999-99" name='cpf_pai' ref={register} />
                        <span className="erro"> {errors.cpf_pai?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>RG da Pai</label>
                        <input name='rg_pai' ref={register} />
                        <span className="erro"> {errors.cpf_pai?.message} </span>
                    </InputText>
                </InputContainer>
                <hr/>
                <InputContainer>
                    <InputText w={100}>
                        <label>Responsável Legal</label>
                        <p className='info'>* Só é nescessário preencher caso os pais não tiverem a guarda do jovem</p>
                        <input name='responsavel_legal' ref={register} />
                        <span className="erro"> {errors.responsavel_legal?.message} </span>

                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>CPF Responsável</label>
                        <Controller as={InputMask} control={control} mask="999.999.999-99" name='cpf_responsavel_legal' ref={register} />
                        <span className="erro"> {errors.cpf_responsavel_legal?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>RG Responsável</label>
                        <input name='rg_responsavel_legal' ref={register} />
                        <span className="rg_responsavel_legal"> {errors.cpf_pai?.message} </span>
                    </InputText>
                </InputContainer>

                    <InputContainer>
                        <InputText w={100}>
                            <label>Observações</label>
                            <textarea name='obs' ref={register({ required: true })} />
                            <span className="erro"> {errors.obs?.message} </span>
                        </InputText>
                    </InputContainer>

                    <input type="submit" value="Enviar" />
                </Form>
        
                { isModalVisible ? // verifica se o modal é pra estar visivel
                <ModalForm
                    title={'Tudo Certo?'}
                    service={JovemService.create}
                    data={formData}
                    type={'default'}
                >
                            <div className="resumoContainer">                             
                                <div className="tag">
                                <h2>Nome</h2>
                                <h2>Admissão</h2>
                                <h2>Curso</h2>
                                <h2>Jornada</h2>
                                </div>

                                <div className="valuesInfo">
                                <h2>{formData.nome}</h2>
                                <h2>{dataFormat.fullDateBR(formData.admissao)}</h2>
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

