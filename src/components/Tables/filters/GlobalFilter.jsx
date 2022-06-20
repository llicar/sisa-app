import React from 'react'

export const GlobalFilter = ({filter,setFilter,preGlobalFilter}) =>{
    
    return (
       <input 
       className={"globalFilter"} 
       value={filter||''} 
       onChange={(e) => setFilter(e.target.value)}
       placeholder={"Buscar..."}
       />
    )
}