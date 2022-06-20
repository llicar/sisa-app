import React from 'react'


export function DateRangeColumnFilter({
  column: { filterValue = [], setFilter }}) 
{
 
  return (
      <div
          style={{
              display: "flex"
          }}
      >
          <input
              value={filterValue[0] || ""}
              type="date"
              onChange={e => {
                  const val = e.target.value;
                  setFilter((old = []) => [val ? (val) : undefined, old[1]]);
              }}
              style={{
                  width: "170px",
                  marginRight: "0.5rem"
              }}
          />
    <input
              value={filterValue[1] || ""}
              type="date"
              onChange={e => {
                  const val = e.target.value;
                  setFilter((old = []) => [old[0], val ? (val) : undefined]);
              }}
              style={{
                  width: "170px",
                  marginLeft: "0.5rem"
              }}
          />
      </div>
  );
}