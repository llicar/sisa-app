import styled from 'styled-components'

 export const FormNoteStyle = styled.form`

    width: 65%;
    select{
        border:none;
    }
    textarea{
        font-weight:15px;
        border:none;
    }
    label{
        font-size: 18px;
    }

    input[type=submit]{
            background-color: ${props => props.disableButton};
            margin: 0 auto;
            width:100px;
            height:30px;
            margin-top: 30px;
        
            border-radius:5px;
            font-size:20px;
        }

`
export const NoteContainer = styled.div`
    width:70%;
    display:flex;
    align-items:center;
    justify-content:center;
`