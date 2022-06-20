import React from 'react'


const Filter = ({column}) =>{
    const {filterValue,setFilter} = column
    return(
        <span>
            <input 
                value={filterValue || ''} 
                place
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    )
}
  export default Filter