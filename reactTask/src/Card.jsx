import { useState } from "react";

function Card({className,rowsData = [],style}) {
    const [editingRow, setEditingRow] = useState(-1)
    const [editingCol, setEditingCol] = useState(-1)
    const [value, setValue] = useState('')
   const gettingColSizeHeading = (rowsData)=>{
    let mappedData = []
    for (let key in rowsData[0]){
        mappedData.push(key)
    }
    const res = mappedData.map((d)=>{
        return <th>{d}</th>
    })
    return res
   }
   const gettingColSizeData = (singleRow,colIndex,editingCol,editingRow)=>{
    let mappedData = []
    for (let key in singleRow){
        mappedData.push(singleRow[key])
    }
    const res = mappedData.map((d,rowIndex)=>{
        console.log('trueorfalse',editingRow === rowIndex,editingCol === colIndex)
        return <td onClick={()=>{
            setEditingRow(rowIndex);
            setEditingCol(colIndex);
            setValue(d)
        }}>{(editingRow === rowIndex && editingCol === colIndex) ? <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}}/> : d} </td>
    })
    return res
   }

   console.log('edititng',editingCol,editingRow)

  return (
    <div className={`${className} mainTableDIV`} style={style}>
      <table>
        <tr id = 'tableHeading'>
          {gettingColSizeHeading(rowsData)}
        </tr>
        {rowsData.map((d,index)=>(
             <tr key = {index}>
               {gettingColSizeData(d,index,editingCol,editingRow)}
            </tr>
        ))}
      </table>
    </div>
  );
}

export default Card