import React,{createContext,useState,useContext} from 'react';

export const ModalContext = createContext();

export default function ModalProvider({children}) {
    
    const [isModalVisible, setIsModalVisible] = useState(false);// Controla a visibilidade do modal
    const [isNoteVisible, setIsNoteVisible] = useState(true);//Controla a visibilidade formulário de anotações

    return(
        <ModalContext.Provider value={{
            isModalVisible,
            setIsModalVisible,
            isNoteVisible,
            setIsNoteVisible,
        }
        }>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal(){
    
    const context = useContext(ModalContext);
    const {isModalVisible, setIsModalVisible} = context;
    const {isNoteVisible, setIsNoteVisible} = context;
    
    return {
        isModalVisible, 
        setIsModalVisible,
        isNoteVisible, 
        setIsNoteVisible
    }
}

