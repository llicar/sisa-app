import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import ReactCepPromise from "react-cep-promise";
import { validateCPF } from "validations-br";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '../../components/form'
import Header from '../../components/header'
import { InputText } from '../../components/input'
import { InputContainer } from '../../components/inputContainer'
import { Title } from '../../components/title'


import JovemService from '../../services/jovens'
import ModalForm from '../../components/modal'
import FormNote from '../../components/formNote'

import estados from '../../utils/estados.json'


yup.setLocale({
    mixed: {
        required: 'Campo obrigatório'
    }
})


const validationSchema = yup.object().shape({

    rg: yup
        .string()
        .required(),

    emissao_rg: yup
        .string()
        .required(),

    cpf: yup
        .string()
        .required()
        .test(
            'validação de CPF',
            'CPF Inválido',
            (value) => validateCPF(value)),

    data_nascimento: yup
        .string()
        .required(),

    cidade_nascimento: yup
        .string()
        .required(),

    estado_nascimento: yup
        .string()
        .required(),

    fone1: yup
        .string()
        .required(),

    opc_responsavel: yup
        .string()
        .required(),

    mae: yup
        .string()
        .required(),

    cep: yup
        .string()
        .required(),

    bairro: yup
        .string()
        .required(),

    rua: yup
        .string()
        .required(),

    municipio: yup
        .string()
        .required(),

    numero: yup
        .string()
        .required(),

    uf: yup
        .string()
        .required(),

    escola: yup
        .string()
        .required(),

    escolaridade: yup
        .string()
        .required(),

    periodo: yup
        .string()
        .required(),

    ja: yup
        .string()
        .required(),

    jae: yup
        .string()
        .required(),
})



const CadastrarJovem_3 = () => {
    const params = useParams();

    const [fetching, setFetching] = useState(false); // Nescessário para o funcionamento do ReactCepPromisse
    const [cep, setCep] = useState("");// Armazena o CEP vindo da função de buscar CEP
    const [city, setCity] = useState("")// Cidade
    const [state, setState] = useState("");// Estado
    const [neighborhood, setNeighborhood] = useState("");// Bairro
    const [street, setStreet] = useState("");// Rua
    const [isNote, setIsNote] = useState(false);// Armazena o estado que define se é para fazer uma anotação ou não
    const [formData, setFormData] = useState(""); // Armazena os dados do formulário
    const [jovem, setJovem] = useState([{}]); // Armazena os dados do jovem
    const [anotacao, setAnotacao] = useState({});//Armazena os dados da anotação

    const [isModalVisible, setIsModalVisible] = useState(false);// Controla a visibilidade do modal
    const [isNoteVisible, setIsNoteVisible] = useState(false);//Controla a visibilidade formulário de anotações

    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

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

    //Buscando jovem pelo id da requisição
    useEffect(() => {
        async function buscarDados() {
            const response = await JovemService.show(params.id);
            setJovem(response.data[0])
            
            //Verifica se é para fazer uma anotação ou não
            if(response.data[0].etapa >=3){
                setIsNoteVisible(true)
                setIsNote(true)
            }
        }
        buscarDados();
    }, [params.id])

    /**
     * Captura os dados do formulário de anotação e insere no estado {anotacoes}
     * @param {*} data dados da anotação
     */
         function handleAnotacao(data) {
            setIsNoteVisible(false) //Esconde o formulário de anotação
            setAnotacao(data)
        }

    /**
     * Invoca modal e armazenando os dados do formulario do estado Formdata
     * @param {*} data 
     */
    function handleModal(data) {
        setFormData(data);
        setIsModalVisible(true);
    }

    return (

        <body>
            <Header />
            <Title>
                <h2>{jovem.nome}</h2>
            </Title>

            <Form enctype="multipart/form-data" method="post" id="form" onSubmit={handleSubmit(handleModal)}>

                <h2>Dados pessoais</h2>
                <hr />

                <InputContainer>
                    <InputText w={100}>
                        <label>Observações</label>
                        <textarea name='obs' defaultValue={jovem.obs} ref={register} />
                        <span className="erro"> {errors.obs?.message} </span>
                    </InputText>
                </InputContainer>
                
                <InputContainer>
                    <InputText w={45}>
                        <label>RG</label>
                        <input name='rg' ref={register} />
                        <span className="erro"> {errors.rg?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Emissão</label>
                        <input name='emissao_rg' type="date" ref={register} />
                        <span className="erro"> {errors.emissao_rg?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>CPF</label>
                        <Controller as={InputMask} control={control} mask="999.999.999-99" name='cpf' ref={register} />
                        <span className="erro"> {errors.cpf?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Data de nascimento</label>
                        <input name='data_nascimento' type="date" ref={register} />
                        <span className="erro"> {errors.data_nascimento?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={55}>
                        <label>Municipio de nascimento</label>
                        <input name='cidade_nascimento' ref={register} />
                        <span className="erro"> {errors.cidade_nascimento?.message} </span>
                    </InputText>

                    <InputText w={35}>
                        <label>Estado</label>
                        <select name='estado_nascimento' ref={register}>
                            <option value="">Selecione...</option>
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
                        <input name='bilhete_unico' ref={register} />
                        <span className="erro"> {errors.bilhete_unico?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>CTPS</label>
                        <input name='ctps' ref={register} />
                        <span className="erro"> {errors.ctps?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Série</label>
                        <input name='serie' ref={register} />
                        <span className="erro"> {errors.serie?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>Telefone 1</label>
                        <Controller as={InputMask} control={control} mask="(99) 99999-9999" name='fone1' ref={register} />
                        <span className="erro"> {errors.fone1?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Telefone 2</label>
                        <Controller as={InputMask} control={control} mask="(99) 99999-9999" name='fone2' ref={register} />
                        <span className="erro"> {errors.fone2?.message} </span>
                    </InputText>
                </InputContainer>

                <h2>Endereço</h2>
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
                        />
                        <input style={{ display: "none" }} name="cep" value={cep} ref={register}></input>
                        <span className="erro"> {errors.cep?.message} </span>
                    </InputText>

                    <InputText w={65}>
                        <label>Bairro</label>
                        <input id="neighborhood" value={neighborhood} name='bairro' ref={register} />
                        <span className="erro"> {errors.bairro?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={65}>
                        <label>Logradouro</label>
                        <input id="street" value={street} name='rua' ref={register} />
                        <span className="erro"> {errors.rua?.message} </span>
                    </InputText>

                    <InputText w={25}>
                        <label>Numero</label>
                        <input name='numero' ref={register} />
                        <span className="erro"> {errors.numero?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={65}>
                        <label>Municipio</label>
                        <input id="city" value={city} name='municipio' ref={register} />
                        <span className="erro"> {errors.municipio?.message} </span>
                    </InputText>

                    <InputText w={25}>
                        <label>Estado</label>
                        <input id="state" value={state} name='uf' ref={register} />
                        <span className="erro"> {errors.uf?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={30}>
                        <label>Complemento</label>
                        <input name='complemento' ref={register} />
                        <span className="erro"> {errors.complemento?.message} </span>
                    </InputText>

                    <InputText w={30}>
                        <label>Tempo de residência</label>
                        <input name='tempo_moradia' ref={register} />
                        <span className="erro"> {errors.tempo_moradia?.message} </span>
                    </InputText>

                    <InputText w={30}>
                        <label>Situação do imóvel</label>
                        <select name='sit_imovel' ref={register}>
                            <option value="">Selecione...</option>
                            <option value="proprio">Próprio</option>
                            <option value="alugado">Alugado</option>
                            <option value="cedido">Cedido</option>
                            <option value="financiado">Financiado</option>
                        </select>
                        <span className="erro"> {errors.sit_imovel?.message} </span>
                    </InputText>
                </InputContainer>

                <h2>Escolar</h2>
                <hr />

                <InputContainer>
                    <InputText w={100}>
                        <label>Escola</label>
                        <input name='escola' ref={register} />
                        <span className="erro"> {errors.escola?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Endereço da escola</label>
                        <input name='end_escola' ref={register} />
                        <span className="erro"> {errors.end_escola?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>Periodo escolar</label>
                        <select name='periodo' ref={register}>
                            <option value="">Selecione...</option>
                            <option value="MANHÃ">MANHÃ</option>
                            <option value="TARDE">TARDE</option>
                            <option value="NOITE">NOITE</option>
                        </select>
                        <span className="erro"> {errors.periodo?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>RA</label>
                        <input name='ra' ref={register} />
                        <span className="erro"> {errors.ra?.message} </span>
                    </InputText>
                </InputContainer>

                <h2>Dados contratuais</h2>
                <hr />

                <InputContainer>
                    <InputText w={30}>
                        <label>J.A.E</label>
                        <Controller as={InputMask} control={control} mask="99/999" name='jae' ref={register} />
                        <span className="erro"> {errors.jae?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>Oficio</label>
                        <Controller as={InputMask} control={control} mask="9999/999" name='oficio' ref={register} />
                        <span className="erro"> {errors.oficio?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Data do oficio</label>
                        <input type="date" name='data_oficio' ref={register} />
                        <span className="erro"> {errors.data_oficio?.message} </span>
                    </InputText>    
                </InputContainer>
                
                <input style={{ 'display': 'none' }} name="inclusao_pessoais" value={1} ref={register} />

                <input type="submit" value="Enviar" />
            </Form>

            { isModalVisible ?
                <ModalForm
                title={'Tudo Certo?'}
                service={JovemService.update2}
                data={formData}
                dataNote={anotacao}
                paramId={params.id}
                isNote={isNote}
                isNoteVisible={isNoteVisible}
                onClose={() => {
                    setIsModalVisible(false)
                }}
            >
                {
                    isNoteVisible ? 
                    <FormNote handleAnotacao={handleAnotacao} />
                    :
                    <div className="resumoContainer">
                        <div className="tag">
                            <h2>RG</h2>
                            <h2>CPF</h2>
                            <h2>J.A</h2>
                            <h2>JAE</h2>
                            <h2>Oficio</h2>
                        </div>

                        <div className="data">
                            <h2>{formData.rg}</h2>
                            <h2>{formData.cpf}</h2>
                            <h2>{formData.ja}</h2>
                            <h2>{formData.jae}</h2>
                            <h2>{formData.oficio}</h2>
                        </div>
                    </div>
                }
                </ModalForm> :
                false
            }
        </body>
    )
}

export default CadastrarJovem_3;