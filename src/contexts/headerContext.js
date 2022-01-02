import React,{useState,createContext,useContext} from 'react';

export const HeaderContext = createContext({});

export default function HeaderProvider({children}) {
    
    const [isMenuVisible, setIsMenuVisible] = useState(false);// Controla a visibilidade do menu
 
   
    return(
        <HeaderContext.Provider value={{
            isMenuVisible,
            setIsMenuVisible,
        }
        }>
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeader = () => useContext(HeaderContext);

