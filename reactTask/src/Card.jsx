import { useEffect, useState } from "react";

function Card({className,actionState,count,tableData,setTableData}) {
    const [editingRow, setEditingRow] = useState(-1)
    const [editingCol, setEditingCol] = useState(-1)
    const [value, setValue] = useState('')
    const [showInupt, setShowInput] = useState(false)
    const [undoStack, setUndoStack] = useState([])
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
        const newItem = {key:editingCol,row:editingRow,value:tableData[editingRow][editingCol]}
        setUndoStack(prev => [
        ...prev,
        newItem
        ])
        setTableData(updated)
        setShowInput(false)
    }
    }
    if(actionState === 'cancle'){
        setShowInput(false)
    }
    if(actionState === 'undo'){
        if(undoStack.length <= 0)return 
        const poppedVal = undoStack[undoStack.length - 1]
        setUndoStack(prev => prev.slice(0, -1))
        console.log('udnostack',poppedVal)
        const updated = [...tableData]
        updated[poppedVal.row] = {
            ...updated[poppedVal.row],
            [poppedVal.key]:poppedVal.value
        }
        setTableData(updated)
    }
   },[count,actionState])

   console.log('showInupt',showInupt)



  return (
    <div className={`${className} mainTableDIV`} >
      <table>
        <tr id = 'tableHeading'>
          {gettingColSizeHeading(tableData)}
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