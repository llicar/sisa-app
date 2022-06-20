import Header from '../../components/header';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validateCNPJ } from "validations-br";
import { useState } from 'react';
import ReactCepPromise from "react-cep-promise";

import EmpresaService from '../../services/empresas';

import style from '../../globalStyle.css';

import { Form } from '../../components/form';
import { Title } from '../../components/title';
import { InputText } from '../../components/input';
import { InputContainer } from '../../components/inputContainer';
import ModalForm from '../../components/modal';
import { useModal } from '../../contexts/modalContext';


// Esquema de validação para os campos dos formulários
yup.setLocale({
    mixed: {
        required: 'Campo obrigatório'
    }
})

const validationSchema = yup.object().shape({

    razaosocial: yup
        .string()
        .required(),
    nome_fantasia: yup
        .string()
        .required(),
    cnpj: yup
        .string()
        .required()
        .test('validacao de cnpj',
            'CNPJ inválido',
            (value) => validateCNPJ(value)),//utilizando a função validadeCNPJ para validar o CNPJ
    ic: yup
        .string()
        .required(),
    telefone_emp: yup
        .string()
        .required(),
    email: yup
        .string()
        .required(),
    rua_emp: yup
        .string()
        .required(),
    bairro_emp: yup
        .string()
        .required(),
    municipio_emp: yup
        .string()
        .required(),
    numero_emp: yup
        .string()
        .required(),
    uf_emp: yup
        .string()
        .required(),
    vr: yup
        .string()
        .required(),
    va: yup
        .string()
        .required(),
    vr_valor: yup
        .string()
        .required(),
    vt: yup
        .string()
        .required(),
    contrato: yup
        .string()
        .required(),
    modalidade_id: yup
        .string()
        .required(),
})
//----------------------------------------------------


const FormEmpresa = () => {

    const [fetching, setFetching] = useState(false); // Nescessário para o funcionamento do ReactCepPromisse
    const [cep, setCep] = useState("");// Armazena o CEP vindo da função de buscar CEP
    const [city, setCity] = useState("")// Cidade
    const [state, setState] = useState("");// Estado
    const [neighborhood, setNeighborhood] = useState("");// Bairro
    const [street, setStreet] = useState("");// Rua
    const [formData, setFormData] = useState(""); // Armazena os dados do formulario
    const [modalidade, setModalidade] = useState(""); // Armazena a modalidade do contrato 

    const {isModalVisible, setIsModalVisible} = useModal(); // Controla visibilidade do modal

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

    /**
     * Invoca modal e armazenando os dados do formulario do estado Formdata
     * @param {*} data 
     */
    function handleModal(data) {

        setFormData(data);
        setIsModalVisible(true);

        function verificaModalidade(modalidade) {
            if (modalidade === "1")
                return "ARCO ADM 6HR VIGENTE"
            else if (modalidade === "2")
                return "ARCO ADM 6HR HORA"
            else if (modalidade === "3")
                return "ARCO ADM 4HR"
            else if (modalidade=== "4")
                return "ARCO ADM 6HR VIGENTE"
            else if (modalidade === "5")
                return "ARCO 6HR HORA"
            else if (modalidade === "6")
                return "ADM 4HR"
            else if (modalidade === "7")
                return "ARCO EDUCAÇÃO"
            else if (modalidade === "8")
                return "COMERCIO 6HR"
            else if (modalidade === "9")
                return "COMERCIO 4HR"
            else
            return "COMERCIO 4:4HR"
        }

        const modalidade = verificaModalidade(data.modalidade_id);
        setModalidade(modalidade)
    }

  
    return (
        <body style={style}>
            <Header />
            <Title>
                <h1>
                    Cadastrar Empresa
            </h1>
            </Title>
            <Form id="form" onSubmit={handleSubmit(handleModal)} >

                <h2>
                    Dados da empresa
            </h2>
                <hr></hr>

                <InputContainer>
                    <InputText w={100}>
                        <label>Razao Social</label>
                        <input name='razaosocial' ref={register({ required: true })} />
                        <span className="erro"> {errors.razaosocial?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Nome Fantasia</label>
                        <input name='nome_fantasia' ref={register} />
                        <span className="erro"> {errors.nome_fantasia?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={40}>
                        <label>CNPJ</label>
                        <Controller as={InputMask} control={control} mask="99.999.999/9999-99" name='cnpj' ref={register} />
                        <span className="erro"> {errors.cnpj?.message} </span>

                    </InputText>
                    <InputText w={40}>
                        <label>E-mail</label>
                        <input type='email' name='email' ref={register} />
                        <span className="erro"> {errors.email?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Telefones</label>
                        <input name='telefone_emp' ref={register} />
                        <span className="erro"> {errors.telefone_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <h2>
                    Endereço
            </h2>
                <hr></hr>

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
                        <span className="erro"> {errors.cep?.message} </span>
                        <input style={{ display: "none" }} name="cep_emp" value={cep} ref={register}></input>
                    </InputText>
                    <InputText w={55}>
                        <label>Bairro</label>
                        <input id="neighborhood" value={neighborhood} name='bairro_emp' ref={register} />
                        <span className="erro"> {errors.bairro_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={70}>
                        <label>Logradouro</label>
                        <input id="street" value={street} name='rua_emp' ref={register} />
                        <span className="erro"> {errors.rua_emp?.message} </span>
                    </InputText>
                    <InputText w={20}>
                        <label>Numero</label>
                        <input name='numero_emp' ref={register} />
                        <span className="erro"> {errors.numero_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={55}>
                        <label>Municipio</label>
                        <input id="city" value={city} name='municipio_emp' ref={register} />
                        <span className="erro"> {errors.municipio_emp?.message} </span>
                    </InputText>

                    <InputText w={25}>
                        <label>Estado</label>
                        <input id="state" value={state} name='uf_emp' ref={register} />
                        <span className="erro"> {errors.uf_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <h2>
                    Informações de contrato
            </h2>
                <hr></hr>

                <InputContainer>
                    <InputText w={25}>
                        <label>I.C</label>
                        <input name='ic' ref={register} />
                        <span className="erro"> {errors.ic?.message} </span>
                    </InputText>

                    <InputText w={55}>
                        <label>Contrato</label>
                        <select name='contrato' ref={register}>
                            <option value="" >Selecione...</option>
                            <option value="direto" >DIRETO</option>
                            <option value="indireto">INDIRETO</option>
                        </select>
                        <span className="erro"> {errors.contrato?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Modalidade</label>
                        <select name='modalidade_id' ref={register}>
                            <option value="" >Selecione...</option>
                            <option value="1">ARCO OCUP - 6HR - [ VIGENTE ]</option>
                            <option value="2">ARCO OCUP - 6HR [ HORA ]</option>
                            <option value="3">ARCO OCUP - [ 4HR ]</option>
                            <option value="4">ADM - 6HR - [VIGENTE]</option>
                            <option value="5">ADM - 6HR - [ HORA ]</option>
                            <option value="6">ADM - [4HR]</option>
                            <option value="14">ARCO EDUCAÇÃO - 6HR - [VIGENTE]</option>
                            <option value="7">ARCO EDUCAÇÃO - 6HR - [HORA]</option>
                            <option value="8">COMERCIO - [6HR]</option>
                            <option value="9">COMERCIO - [4HR]</option>
                            <option value="10">COMERCIO - [4:45HR]</option>
                        </select>
                        <span className="erro"> {errors.modalidade_id?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>

                    <InputText w={40}>
                        <label>Vale Refeição</label>
                        <select name='vr' ref={register}>
                            <option value="" disable selected >Selecione..</option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                        </select>
                        <span className="erro"> {errors.vr?.message} </span>
                    </InputText>
                    <InputText w={40}>
                        <label>Vale Alimentação</label>
                        <select name='va' ref={register}>
                            <option value="" disable selected >Selecione..</option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                        </select>
                        <span className="erro"> {errors.va?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={40}>
                        <label>Valor do benefício</label>
                        <input list={'vr_valor'} name='vr_valor' ref={register} />
                        <datalist id="vr_valor">
                            <option value={'R$ 181,00'}>R$ 181,00</option>
                            <option value={'PELA EMPRESA'}>PELA EMPRESA</option>
                            <option valeu={'REFEIÇÃO LOCAL'}>REFEIÇÃO LOCAL</option>
                        </datalist>
                        <span className="erro"> {errors.vr_valor?.message} </span>
                    </InputText>

                    <InputText w={40}>
                        <label>Vale Transporte</label>
                        <select id="vt" name="vt" ref={register}>
                            <option value="" disable selected >Selecione..</option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                            <option value="PELA EMPRESA">PELA EMPRESA</option>
                            <option value="DIAS DE CURSO">DIAS DE CURSO</option>
                        </select>
                        <span className="erro"> {errors.vt?.message} </span>
                    </InputText>
                </InputContainer>

                <input type="submit" value="Enviar" />
            </Form>

            { isModalVisible ?
                 <ModalForm
                 title={'Tudo Certo?'}
                 service={EmpresaService.create}
                 data={formData}
                 type={'default'}
             >
                 <div className="resumoContainer">
                    <div className="tag">
                        <h2>Razao Social</h2>
                        <h2>Cnpj</h2>
                        <h2>IC</h2>
                        <h2>Contrato</h2>
                        <h2>Modalidade</h2>
                    </div>

                    <div className="valuesInfo">
                        <h2>{formData.razaosocial}</h2>
                        <h2>{formData.cnpj}</h2>
                        <h2>{formData.ic}</h2>
                        <h2>{formData.contrato}</h2>
                        <h2>{modalidade}</h2>
                    </div>
                </div>
                </ModalForm> :
                false
            }
        </body>
    )
}

export default FormEmpresa;