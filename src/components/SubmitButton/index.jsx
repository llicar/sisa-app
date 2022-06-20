import styled from 'styled-components';
import {Submit} from './style'
import ClipLoader from "react-spinners/ClipLoader";

const SubmitButton = ({children,loading,w,h,color,id,style}) => {

    return(
        <Submit style={style} w={w} h={h} color={color}>
         {
            loading&&id===loading[1] ?
                <ClipLoader size={20} loading={loading} color={'#ffffff'}/>
            : 
            children
        }
        </Submit>
    )
    
}

export default SubmitButton;