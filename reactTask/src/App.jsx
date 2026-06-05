import './App.css'
import {useState} from 'react'
import Card from './Card'

function App() {
  const [actionState,setActionState] = useState(null)
  const [count,setCount] = useState(0)
  const rowsData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    salary: 55000,
    quantity: 12,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    salary: 62000,
    quantity: 8,
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    salary: 48000,
    quantity: 15,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    salary: 71000,
    quantity: 5,
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    salary: 53000,
    quantity: 10,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    salary: 67000,
    quantity: 7,
  },
  {
    name: "Chris Lee",
    email: "chris.lee@example.com",
    salary: 59000,
    quantity: 20,
  },
  {
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    salary: 75000,
    quantity: 4,
  },
  {
    name: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    salary: 51000,
    quantity: 13,
  },
  {
    name: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    salary: 68000,
    quantity: 9,
  },
  ];

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
     <Card className='tableCard' rowsData={rowsData} actionState = {actionState} count={count}/>
    </>
  )
}

export default App
