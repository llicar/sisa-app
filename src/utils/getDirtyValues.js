 /**
     * Função responsavel por criar um novo objeto apenas com os campos alterados do formulario
     * @param {Object} dirtyFields 
     * @param {Object} allValues 
     */  
export default function dirtyValues(dirtyFields,allValues){
   

    // Se * qualquer * item em uma matriz foi modificado, toda a matriz deve ser enviada, porque não há como indicar 
    // "marcadores" para inalterado elementos `dirtyFields` é` true` para folhas.
    if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
    
    // Retorna um objeto combinando o valores
    return Object.fromEntries(
        Object.keys(dirtyFields).map(key => [
        key,
        dirtyValues(dirtyFields[key], allValues[key])
      ])
    );
  }