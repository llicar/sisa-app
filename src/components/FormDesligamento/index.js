import { InputContainer } from '../inputContainer'
import { InputText } from '../input'
import { useForm } from 'react-hook-form'

import {useModal} from '../../contexts/modalContext'
import { DeslContainer, FormDeslStyle } from './style'
import {Submit} from '../input/index'

const FormDesligamento = () => {
    const { register, handleSubmit } = useForm({});

    const {setDataDesligamento} = useModal();
    const {disableButton,setDisableButton} = useModal();

    function handleDesligamento(data) {
        setDataDesligamento(data)
        setDisableButton(false)
    }

    FormDeslStyle.defaultProps = {
        disableButton: "#FA5757"
    }

    disableButton?
        FormDeslStyle.defaultProps.disableButton = "#FA5757"
        : FormDeslStyle.defaultProps.disableButton = "#0EA538"
  
   
    return (
        <DeslContainer>
            <FormDeslStyle onSubmit={handleSubmit(handleDesligamento)}>
                <InputContainer>
                    <InputText w={100}>
                        <label>Motivo</label>
                        <select name="motivo_desligamento" ref={register} required>
                            <option>TÉRMINO DE CONTRATO</option>
                            <option>SOLICITAÇÃO DO APRENDIZ POR MOTIVOS PESSOAIS</option>
                            <option>SOLICITAÇÃO DO APRENDIZ POR EFETIVAÇÃO</option>
                            <option>INADAPTAÇÃO</option>
                        </select>
                    </InputText>
                </InputContainer>

                <InputContainer>
                    <InputText w={40}>
                        <label>Data</label>
                       <input type="date" name="demissao" ref={register} required/>
                    </InputText>

                    <InputText w={40}>
                        <label>Faltas</label>
                       <input type="text" name="faltas_desligamento" ref={register} required/>
                    </InputText>
                </InputContainer>
                <p>Clique no botão "Salvar" antes de enviar o desligamento</p>
                <Submit type="submit" value="Salvar"/>

            </FormDeslStyle >

        </DeslContainer>
    )
}

export default FormDesligamento

