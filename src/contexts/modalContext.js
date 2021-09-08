import React,{useState,createContext,useContext} from 'react';

export const ModalContext = createContext({});

export default function ModalProvider({children}) {
    
    const [isModalVisible, setIsModalVisible] = useState(false);// Controla a visibilidade do modal
    const [isNoteVisible, setIsNoteVisible] = useState(false);//Controla a visibilidade formulário de anotações
    const [isModalDeslVisible,setIsModalDeslVisible] = useState(false);
    
    const [anotacao,setAnotacao] = useState({});
    const [dataDesligamento,setDataDesligamento] = useState({});
    const [disableButton,setDisableButton] = useState(true);
   

    return(
        <ModalContext.Provider value={{
            isModalVisible,
            setIsModalVisible,
            isNoteVisible,                
            setIsNoteVisible,
            anotacao,
            setAnotacao,
            dataDesligamento,
            setDataDesligamento,
            isModalDeslVisible,
            setIsModalDeslVisible,
            disableButton,
            setDisableButton
        }
        }>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);

