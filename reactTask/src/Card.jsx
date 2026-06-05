import { useEffect, useState } from "react";

function Card({className,rowsData = [],actionState,count}) {
    const [tableData, setTableData] = useState(rowsData)
    const [editingRow, setEditingRow] = useState(-1)
    const [editingCol, setEditingCol] = useState(-1)
    const [value, setValue] = useState('')
    const [showInupt, setShowInput] = useState(false)
   const gettingColSizeHeading = ()=>{
    let mappedData = []
    for (let key in tableData[0]){
        mappedData.push(key)
    }
    const res = mappedData.map((d)=>{
        return <th>{d}</th>
    })
    return res
   }
   const gettingColSizeData = (singleRow,rowIndex,editingCol,editingRow) => {

    let mappedData = []
    for (let key in singleRow){
        mappedData.push({key,value:singleRow[key]})
    }
    const res = mappedData.map((d,colIndex)=>{
        return <td key={colIndex} onClick={()=>{
            setEditingRow(rowIndex);
            setEditingCol(d.key);
            setShowInput(true)
            setValue(d.value)
             }}>{
            (showInupt && editingRow === rowIndex && editingCol === d.key) ? 
            <input type="text" value={value} onClick={(e) => e.stopPropagation()} onChange={(e)=>{
                setValue(e.target.value)}}/> : d.value
            } 
            </td>
    })
    return res
   }

   useEffect(()=>{
    console.log('state',actionState)
    if(actionState === 'save'){
    if(value != tableData[editingRow][editingCol]){
        const updated = [...tableData]
        updated[editingRow] = {
            ...updated[editingRow],
            [editingCol]:value
        }
        console.log('updated',updated)
        setTableData(updated)
        setShowInput(false)
    }
    }
    if(actionState === 'cancle'){
        setShowInput(false)
    }
   },[count,actionState])

   console.log('showInupt',showInupt)



  return (
    <div className={`${className} mainTableDIV`} >
      <table>
        <tr id = 'tableHeading'>
          {gettingColSizeHeading(rowsData)}
        </tr>
        {tableData.map((d,rowIndex)=>(
             <tr key = {rowIndex}>
               {gettingColSizeData(d,rowIndex,editingCol,editingRow)}
            </tr>
        ))}
      </table>
    </div>
  );
}

export default Card