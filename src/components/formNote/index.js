import { InputContainer } from '../inputContainer'
import { InputText } from '../input'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const FormNoteStyle = styled.form`
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

const FormNote = ({ handleAnotacao = () => { } }) => {
    const { register, handleSubmit } = useForm({});

    return (
        <NoteContainer>
            <FormNoteStyle onSubmit={handleSubmit(handleAnotacao)}>
                <InputContainer>
                    <InputText w={100}>
                        <label>Motivo</label>
                        <select name="titulo" ref={register} required>
                            <option>Correção de dados</option>
                            <option>Alteração nas datas</option>
                            <option>Desligamento</option>
                        </select>
                    </InputText>
                </InputContainer>
                <InputContainer>
                    <InputText>
                        <label>Descrição</label>
                        <textarea name="descricao" type="textfield" ref={register} required />
                    </InputText>
                </InputContainer>
                <input type='submit' value="Anotar!" />
            </FormNoteStyle>
        </NoteContainer>
    )
}

export default FormNote

