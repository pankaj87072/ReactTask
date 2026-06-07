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
  const [scrollTop, setScrollTop] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [sort, setSort] = useState(false)


  const fetchData = async ()=>{
    try{
      setLoading(true)
   const resp = await fetch(`https://randomuser.me/api/?results=500`)
   const data = await resp.json()
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
      const sortedData = sort ? sortingAsc() : data
      console.log('sorteddata',sortedData)
    const rowHeight = 40;
    const containerHeight = 400;
    setStartIndex(Math.floor(scrollTop / rowHeight));
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    setEndIndex(startIndex + visibleRows);
    setTableData(sortedData.slice(startIndex,endIndex))
    }
  },[currentPage,data,scrollTop,sort])
  
  const handleAction = (action)=>{
    setActionState(action)
    setCount(c => c+1)
  }
  const sortingAsc = ()=>{
    if(!sort)return
    return [...data].sort((a,b)=>a?.name?.localeCompare(b?.name))
  }  
  console.log('sort',sort)
  
  return (
    <>
     <div className='navHeading'>ClaudeSignal React Coding Task</div>
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
     {loading ? 'Loading...' : <><Card className='tableCard' actionState = {actionState} count={count} tableData={tableData} setTableData={setTableData} setScrollTop={setScrollTop} totalItem = {data.length} startIndex={startIndex} endIndex={endIndex} setSort={setSort} sort={sort}/>
     <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/></>}
    </>
  )
}

export default App
