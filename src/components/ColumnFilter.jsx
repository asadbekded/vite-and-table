import React from 'react'

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
  return (
    <div>
        Search: 
        <input type="text" value={filterValue || ''} onChange={(evt) => setFilter(evt.target.value)} />
    </div>
  )
}
