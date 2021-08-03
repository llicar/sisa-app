import { InputContainer } from '../inputContainer'
import { InputText } from '../input'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const FormStyle = styled.form`
    select{
        background-color:white;
        border-color:#1EC3BA;
        color:black;
    }
    label{
        color:black;
        font-size:15px;
    }
    textarea{
        width:100%;
        height:50px;
        border:1px solid #1EC3BA;
        border-radius: 5px;
        margin-top:15px;
        font-weight:15px;
    }
`
const NoteContainer = styled.div`
    width:40%;
    display:flex;
    align-items:center;
    justify-content:center;
`

const FormDesligamento = ({ handleDesligamento = () => { } }) => {
    const { register, handleSubmit } = useForm({});

    return (
        <NoteContainer>
            <FormStyle onSubmit={handleSubmit(handleDesligamento)}>
                <InputContainer>
                    <InputText w={100}>
                        <label>Motivo</label>
                        <select name="motivo_desligamento" ref={register} required>
                            <option>Término de contrato</option>
                            <option>Solitação do aprendiz</option>
                            <option>Inadaptação</option>
                        </select>
                    </InputText>
                </InputContainer>
                <InputContainer>
                    <InputText>
                        <label>Detalhes</label>
                        <textarea name="descricao_desligamento" type="textfield" ref={register} required />
                    </InputText>
                </InputContainer>
                <input type='submit' value="Seguinte" />
            </FormStyle>
        </NoteContainer>
    )
}

export default FormDesligamento

