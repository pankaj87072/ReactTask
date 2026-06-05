import './App.css'
import {useState,useEffect} from 'react'
import Card from './Card'
import Pagination from './Pagination'

function App() {
  const [actionState,setActionState] = useState(null)
  const [count,setCount] = useState(0)
  const [tableData,setTableData] = useState([])
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(5)

  const fetchData = async ()=>{
    try{
      setLoading(true)
   const resp = await fetch(`https://randomuser.me/api/?results=5000`)
   const data = await resp.json()
   console.log(data.results)
   if(data){
    const formattedData = data.results.map((d)=>{
      return {
        name:d.name.first + ' ' + d.name.last,
        email:d.email,
        gender:d.gender,
        salary: Math.floor(Math.random() * 100000),
      }
    })
    setData(formattedData)
    setTotalPages(formattedData.length/10)
   }
  }catch(e){
    console.log('error',e)
    setLoading(false)
  }finally{
  setLoading(false)
  }
}
  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    const pages = (currentPage-1) * 10
    if(data){
    setTableData(data.slice(pages,pages+10))
    }
  },[currentPage,data])
  
  console.log('tabledata',tableData)

  const handleAction = (action)=>{
    setActionState(action)
    setCount(c => c+1)
  }
  
  console.log('parent',actionState)
  return (
    <>
     <div className='navHeading'>Claude9 React Coding Task</div>
     <div className='actionButtons'>
       <button onClick={()=>handleAction('save')}>
        Save
       </button>
       <button onClick={()=>handleAction('cancle')}>
        Cancel
       </button>
       <button onClick={()=>handleAction('undo')}>
        Undo
       </button>
     </div>
     {loading ? 'Loading...' : <><Card className='tableCard' actionState = {actionState} count={count} tableData={tableData} setTableData={setTableData}/>
     <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/></>}
    </>
  )
}

export default App
