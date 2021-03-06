import React from 'react';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import md5 from 'md5';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '../../components/form'
import Header from '../../components/header'
import { InputText } from '../../components/input'
import { InputContainer } from '../../components/inputContainer'
import { Title } from '../../components/title'


import JovemService from '../../services/jovens'
import ModalForm from '../../components/modal'
import dataFormat from '../../utils/dataFormat'
import FormNote from '../../components/formNote'
import { useModal } from '../../contexts/modalContext';


yup.setLocale({
    mixed: {
        required: 'Campo obrigatório'
    }
})


const validationSchema = yup.object().shape({

    admissao: yup
        .string()
        .required(),

    inicio_emp: yup
        .string()
        .required(),

    termino_emp: yup
        .string()
        .required(),

    demissao: yup
        .string()
        .required(),

    periodo_inicial: yup
        .string()
        .required(),

    periodo_final: yup
    .string()
    .required(),

    calendario : yup
        .mixed()
        .required()
})


const CadastrarJovem_2 = () => {

    const params = useParams();

    const [jovem, setJovem] = useState([{}]);//Armazena dados do jovem vindo da API
    const [datasFormatadas, setDatasFormatadas] = useState({}) //Armazena as datas formatadas
    const [formData, setFormData] = useState("");//Armazena os dados prontos para enviar para a API
    const [modalType, setModalType] = useState('default');//Armazena o estado que define se é para fazer uma anotação ou não

    const {isModalVisible, setIsModalVisible} = useModal(false);//Controla a visibilidade do modal
    const {isNoteVisible, setIsNoteVisible} = useModal(false);//Controla a visibilidade formulário de anotações
    const [fileName, setFileName] = useState('Clique para selecionar');//Controla o nome que aparecera no Input File
   
    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    //Buscando jovem na api pelo id da requisição
    useEffect(() => {

        async function buscarDados(){
            const response = await JovemService.show(params.id)
            setJovem(response.data[0]);

            if(response.data[0].inclusao_calendario){
                setIsNoteVisible(true)
                setModalType('note')
            }
            const datas = {             
                isoAdmissao: dataFormat.iso(response.data[0].admissao),
                isoInicioEmp: dataFormat.iso(response.data[0].inicio_emp),
                isoTerminoEmp: dataFormat.iso(response.data[0].termino_emp),
                isoDemissao: dataFormat.iso(response.data[0].demissao),
                isoIncioFerias: dataFormat.iso(response.data[0].inicio_ferias),
                isoFimFerias: dataFormat.iso(response.data[0].fim_ferias)
            }
            setDatasFormatadas(datas) 
            console.log(datas)
        }
        buscarDados();
    }, [params.id,jovem.etapa])

   /**
    * Captura dos dados do formulario e insere no estado {FormData}
    * @param {*} data dados do formulário
    */
    function handleModal(data) {

        //Tratando nome do calendario
        const md5Calendar = md5(data.calendario[0].name); //criando hash md5 com o nome do arquivo
        const typeFile = data.calendario[0].name.split(".");//capturando o tipo do arquivo
        const hashCalendarName = `${md5Calendar}.${typeFile[1]}`; //criando hash com o (nome md5).(tipo do arquivo)

        const Data = new FormData() 

        Data.append('calendario', data.calendario[0])
        Data.append('admissao', data.admissao)
        Data.append('demissao', data.demissao)
        Data.append('inicio_emp', data.inicio_emp)
        Data.append('termino_emp', data.termino_emp)
        Data.append('inicio_ferias', data.inicio_ferias)
        Data.append('fim_ferias', data.fim_ferias)
        Data.append('periodo_inicial', data.periodo_inicial)
        Data.append('periodo_final', data.periodo_final)
        Data.append('inclusao_calendario',1)
        Data.append('obs',data.obs)
        Data.append('calendarName', hashCalendarName)

        setFormData(Data);
        setIsModalVisible(true);

        
    }
    //----------------------------------------------------------------

    return (

        <body>
            <Header />
            <Title>
                <h2>{jovem.nome}</h2>
            </Title>

            <Form enctype="multipart/form-data" method="post" id="form" onSubmit={handleSubmit(handleModal)}>

                <h2>
                    {jovem.tipo_contrato} - {jovem.carga_horaria} - {jovem.dia_ap}
                </h2>
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
                    <InputText w={45}>
                        <label>Inicio férias</label>
                        <input name='inicio_ferias' type="date" defaultValue={datasFormatadas.isoIncioFerias} ref={register} />
                        <span className="erro"> {errors.inicio_ferias?.message} </span>
                    </InputText>

                    <InputText w={45}>
                        <label>Fim férias</label>
                        <input name='fim_ferias' type="date" defaultValue={datasFormatadas.isoFimFerias} ref={register} />
                        <span className="erro"> {errors.fim_ferias?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={45}>
                        <label>Formação inicial</label>
                        <input name='periodo_inicial' defaultValue={jovem.periodo_inicial} ref={register} />
                        <span className="erro"> {errors.periodo_inicial?.message} </span>
                    </InputText>
                    <InputText w={45}>
                        <label>Formação final</label>
                        <input name='periodo_final'ref={register} />
                        <span className="erro"> {errors.periodo_final?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Observações</label>
                        <textarea name='obs' defaultValue={jovem.obs} ref={register} />
                        <span className="erro"> {errors.obs?.message} </span>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={100}>
                        <label>Calendário</label>
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
                </InputContainer>

               
                <input type="submit" value="Enviar" />

            </Form>

            { isModalVisible ? // verifica se o modal é pra estar visivel
                <ModalForm
                    title={'Tudo Certo?'}
                    service={JovemService.update1}
                    data={formData}
                    paramId={params.id}
                    type={modalType}
                    isNoteVisible={isNoteVisible}
                >

                    {
                        isNoteVisible ? // verifica se o formulário de anotações é pra estar visivel
                        
                            <FormNote/>

                            :

                            <div className="resumoContainer">
                                <div className="tag">
                                    <h2>Admissao</h2>   
                                    <h2>Inicio Emp</h2>
                                    <h2>Termino Emp</h2>
                                    <h2>Demissao</h2>
                                </div>
                            
                                <div className="valuesInfo">
                                    <h2>{dataFormat.fullDateBR(formData.get('admissao'))}</h2>
                                    <h2>{dataFormat.fullDateBR(formData.get('inicio_emp'))}</h2>
                                    <h2>{dataFormat.fullDateBR(formData.get('termino_emp'))}</h2>
                                    <h2>{dataFormat.fullDateBR(formData.get('demissao'))}</h2>
                                </div>
                            </div>
                    }


                </ModalForm> 
                : false}
            

        </body>
               
               
    )
    
}

export default CadastrarJovem_2;
