import React,{useState,useEffect} from 'react'
import TodoRow from '../components/TodoRow.jsx'
import TodoAddForm from '../components/TodoAddForm.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import Left & Right Arrows
import {getTodos} from "../api/todoApi.js"


function Todo() {

    const[isAddTaskModalOpen,setIsAddTaskModalOpen] = useState(false)
    // const[isEditTaskModalOpen,setIsEditTaskModalOpen] = useState(false)

    const[page,setPage] = useState(1)
    const[limit,setLimit] = useState(10)
    const[types,setTypes] = useState("all")
    const[todos,setTodos] = useState({})
    let lastPage = Math.ceil(todos?.total/limit)


    useEffect(()=>{
        const skip = (page - 1) * limit

        const fetchtodos = async () => {
            try {
              const data = await getTodos(limit,skip);
              setTodos(data);
              console.log(data);
              
            } catch (error) {
              console.error("Error fetching todos:", error);
            }
          };
          fetchtodos();


    },[limit,page,types,isAddTaskModalOpen])

  return (
    <div className='flex justify-center bg-[rgb(248,247,255)]'>
        <div className='border-2 border-black w-4/6'>
        <p className='text-3xl font-bold my-5 text-center'>Todo List</p>
        <div className='flex items-center justify-between m-2'>
            <div>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md'
                onClick={()=>setIsAddTaskModalOpen((priv)=>!priv)}>
                    Add Task
                </button>
            </div>
            <div className='flex gap-2'>
                <select 
                onChange={(e)=>{setTypes(e.target.value)}}
                className='bg-slate-200 rounded-md' name="status-pg" id="status-pg">
                    <option defaultValue="all" value="all">All</option>
                    <option value="true">Completed</option>
                    <option value="false">Incomplete</option>
                </select>

                <select className='bg-slate-200 rounded-md' 
                name="noOfTodoPerPage" 
                value={limit}
                onChange={(e)=>{setLimit(Number(e.target.value))}}
                id="todoCount">
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                </select>

            </div>
        </div>
        <div className='bg-gray-200 my-3 rounded-md flex flex-col gap-2 p-3'>

            {
                todos?.todos?.map((todo)=>{
                    return <TodoRow todo={todo} key={todo.id} /> // setIsEditTaskModalOpen={setIsEditTaskModalOpen} isEditTaskModalOpen = {isEditTaskModalOpen} />
                })
            }
        </div>

        {
            isAddTaskModalOpen && <TodoAddForm setIsAddTaskModalOpen = {setIsAddTaskModalOpen}/>
        }

        <div className='flex justify-evenly'>
            <button
            className='bg-slate-200 w-6 rounded-md'
            onClick={()=>setPage((priv)=>priv>1?priv - 1:1)}>
                <FontAwesomeIcon 
                icon={faArrowLeft} 
                className="cursor-pointer bg-slate-200 text-gray-400" />
            </button>
            <span>{page}/{lastPage}</span>
            <button
            className='bg-slate-200 w-6 rounded-md'
            onClick={()=>setPage((priv)=>priv<lastPage?priv + 1:priv)}>
                <FontAwesomeIcon 
                icon={faArrowRight} 
                className="cursor-pointe text-gray-400" />
            </button>
            
        </div>

    </div>

    </div>
    
  )
}

export default Todo