import { InputContainer } from '../inputContainer'
import { InputText } from '../input'
import { useForm } from 'react-hook-form'

import { useModal } from '../../contexts/modalContext'
import { FormNoteStyle, NoteContainer } from './style'
import {Submit} from '../input/index'



const FormNote = () => {
    
    const {setIsNoteVisible,setAnotacao} = useModal();
    
    const { register, handleSubmit } = useForm({});

    function handleAnotacao(data) {
        setIsNoteVisible(false)
        setAnotacao(data)
    }

    return (
        <NoteContainer>
            <FormNoteStyle onSubmit={handleSubmit(handleAnotacao)}>
                <InputContainer className="input-container">
                    <InputText  w={100}>
                        <label>Motivo</label>
                        <select name="titulo" ref={register} required>
                            <option>Correção de dados</option>
                            <option>Alteração nas datas</option>
                        </select>
                    </InputText>
                </InputContainer>
                <InputContainer>
                    <InputText className="desc" w={100}> 
                        <label>Descrição</label>
                        <textarea name="descricao" type="textfield" ref={register} required />
                    </InputText>
                </InputContainer>
                <Submit type='submit' value="Anotar!" />
            </FormNoteStyle>
        </NoteContainer>
    )
}

export default FormNote


