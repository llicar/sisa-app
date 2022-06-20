import {useEffect} from 'react'
import Header from '../../components/header';
import { useForm} from 'react-hook-form';
import { useState } from 'react';
import { useParams} from 'react-router-dom';

import EmpresaService from '../../services/empresas';
import ModalidadeService from '../../services/modalidades';

import style from '../../globalStyle.css';

import { Form } from '../../components/form';
import { Title } from '../../components/title';
import { InputText } from '../../components/input';
import { InputContainer } from '../../components/inputContainer';
import ModalForm from '../../components/modal';
import { useModal } from '../../contexts/modalContext';
import getDirtyValues from '../../utils/getDirtyValues'


const DetalheEmpresa = () => {

    const params = useParams();

    const [empresa, setEmpresa] = useState(""); // Armazena a modalidade do contrato 
    const [modalidades, setModalidades] = useState([]); // Armazena a modalidade do contrato 
    const [dirtyValues, setDirtyValues] = useState([]) // Armazena os campos alterados

    const {isModalVisible, setIsModalVisible} = useModal(); // Controla visibilidade do modal


    //Buscando dados do jovem na API
    useEffect(() => {
        async function buscarDados(){
            const empresas = await EmpresaService.buscarEmpresaPorId(params.id)
                setEmpresa(empresas.data[0]);
            }
            buscarDados();
        }, [params.id])

    useEffect(() => {
        async function buscarDados(){
            const modalidades = await ModalidadeService.index()
                setModalidades(modalidades.data);
            }
            buscarDados();
        }, [])

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

    const {dirtyFields } = formState; // Variaveis do formState que captura os campos alterados no formulário

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

    return (
        <body style={style}>
            <Header />
            <Title>
                <h1>
                    {empresa.razaosocial}
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
                        <input name='razaosocial' defaultValue={empresa.razaosocial} ref={register({ required: true })} />
                        <span className="erro"> {errors.razaosocial?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Nome Fantasia</label>
                        <input name='nome_fantasia' defaultValue={empresa.nome_fantasia} ref={register} />
                        <span className="erro"> {errors.nome_fantasia?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={40}>
                        <label>CNPJ</label>
                        <input  name='cnpj' defaultValue={empresa.cnpj} ref={register} />
                        <span className="erro"> {errors.cnpj?.message} </span>

                    </InputText>
                    <InputText w={40}>
                        <label>E-mail</label>
                        <input type='email' name='email' defaultValue={empresa.email} ref={register} />
                        <span className="erro"> {errors.email?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Telefones</label>
                        <input name='telefone_emp' defaultValue={empresa.telefone_emp} ref={register} />
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
                        <span className="erro"> {errors.cep?.message} </span>
                        <input name="cep_emp" defaultValue={empresa.cep_emp} ref={register}></input>
                    </InputText>
                    <InputText w={55}>
                        <label>Bairro</label>
                        <input name='bairro_emp' defaultValue={empresa.bairro_emp} ref={register} />
                        <span className="erro"> {errors.bairro_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={70}>
                        <label>Logradouro</label>
                        <input name='rua_emp' defaultValue={empresa.rua_emp} ref={register} />
                        <span className="erro"> {errors.rua_emp?.message} </span>
                    </InputText>
                    <InputText w={20}>
                        <label>Numero</label>
                        <input name='numero_emp' defaultValue={empresa.numero_emp} ref={register} />
                        <span className="erro"> {errors.numero_emp?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={55}>
                        <label>Municipio</label>
                        <input id="city" name='municipio_emp' defaultValue={empresa.municipio_emp} ref={register} />
                        <span className="erro"> {errors.municipio_emp?.message} </span>
                    </InputText>

                    <InputText w={25}>
                        <label>Estado</label>
                        <input id="state" name='uf_emp' defaultValue={empresa.uf_emp} ref={register} />
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
                        <input name='ic' defaultValue={empresa.ic} ref={register} />
                        <span className="erro"> {errors.ic?.message} </span>
                    </InputText>

                    <InputText w={55}>
                        <label>Contrato</label>
                        <select name='contrato' defaultValue={empresa.contrato} ref={register}>
                        <option selected disabled value={empresa.contrato}>{empresa.contrato}</option>
                            <option value="direto" >DIRETO</option>
                            <option value="indireto">INDIRETO</option>
                        </select>
                        <span className="erro"> {errors.contrato?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Modalidade</label>
                        <select name='modalidade_id' defaultValue={empresa.modalidade_id} ref={register}>
                            <option selected disabled value={empresa.modalidade_id}>{empresa.nome_modalidade}</option>
                            {modalidades.map(index =>{
                                return(
                                    <option value={index.id_modalidade}>{index.nome_modalidade}</option>
                                )
                            })}  
                            </select>
                        <span className="erro"> {errors.modalidade_id?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>

                <InputText w={40}>
                        <label>Vale Refeição</label>
                        <select name='vr' defaultValue={empresa.vr} ref={register}>
                            <option selected disabled value={empresa.vr}>{empresa.vr}</option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                        </select>
                        <span className="erro"> {errors.vr?.message} </span>
                    </InputText>
                    <InputText w={40}>
                        <label>Vale Alimentação</label>
                        <select name='va' defaultValue={empresa.va} ref={register}>
                            <option selected disabled value={empresa.va}>{empresa.va}</option>
                            <option value="SIM">SIM</option>
                            <option value="NÃO">NÃO</option>
                        </select>
                        <span className="erro"> {errors.va?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={40}>
                        <label>Valor do beneficio</label>
                        <input name='vr_valor' defaultValue={empresa.vr_valor} ref={register} />
                        <span className="erro"> {errors.vr_valor?.message} </span>
                    </InputText>

                    <InputText w={40}>
                        <label>Vale Transporte</label>
                        <select id="vt" name="vt" defaultValue={empresa.vt} ref={register}>
                            <option value={empresa.vt} selected disabled>{empresa.vt}</option>
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
                 title={'Alterar dados?'}
                 service={EmpresaService.alterarEmpresaPorId}
                 data={dirtyValues}
                 paramId={params.id}
                 type={'default'}
             >
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
                </ModalForm> :
                false
            }
        </body>
    )
}

export default DetalheEmpresa;