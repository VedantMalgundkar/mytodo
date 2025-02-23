import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {AddTodo,updateTodo} from "../api/todoApi.js"


// top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
function TodoAddForm({todo,setIsAddTaskModalOpen,onTodoUpdated}) {

    const [fields,setFields] = useState({
        todo:todo?.todo||"",
        completed:todo?.completed||false
    })
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false) 

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        setLoading(true);
        setError("")

        if (!fields.todo.trim()){
            console.log("raised");
            setError("Your todo is empty.")
            return;
        }
        
        console.log(error,fields);

        try {
            if (todo?._id){
                console.log("in update block");
                
                const updatedTodo = await updateTodo(todo._id, fields)
                console.log("todo updated successfully:", updatedTodo);
                alert("todo updated successfully:");
                setIsAddTaskModalOpen((priv)=>!priv)
            }else{
                const newTodo = await AddTodo({...fields})
                console.log("todo added successfully:", newTodo);
                alert("todo added successfully:");
                setFields((priv)=>{
                    return {...priv,todo:""}
                    }
                )
            }
            console.log(onTodoUpdated);
            
            onTodoUpdated();
            
          } catch (err) {
            setError("Failed to add/update todo.");
          } finally {
            setLoading(false);
          }

        
    }
  return (
    <div className='bg-black/20 absolute inset-0 flex justify-center items-center'>
        <div className='bg-[rgb(248,247,255)] w-2/4 p-3 rounded-md'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold'>{todo?.todo?"Edit Todo":"Add Todo"}</p>
                <FontAwesomeIcon icon={faXmark} 
                onClick={()=>setIsAddTaskModalOpen((priv)=>!priv)}
                className='cursor-pointer'/>
            </div>
            <form onSubmit={onSubmitHandler} className='mt-2'>
                <div className='flex flex-col gap-1'>

                    <label htmlFor="todo"
                    className='text-sm text-gray-500'>Todo</label>
                    <input id='todo' value={fields.todo} type="text" required onChange={(e)=>{
                        setFields((priv)=>{
                                return {...priv,todo:e.target.value}
                            }
                        )
                        }}/>
                    
                    {
                        error && (
                            <span className='text-sm text-red-500'>todo is empty</span>
                        )
                    }
                    
                    <label htmlFor="status"
                    className='text-sm text-gray-500'>Status</label>
                    <select className='rounded-md' 
                    name="status"
                    value={fields.completed ? "true" : "false"} 
                    id="status"
                    onChange={(e)=>{
                        setFields((priv)=>{
                                return {...priv,completed:e.target.value === 'true'}
                            }
                        )
                    }}>
                        <option value="false">Incomplete</option>
                        <option value="true">Completed</option>
                    </select>


                    <div className='flex gap-2 mt-5'>
                        <button 
                        className='bg-blue-600 text-white px-3 py-1 rounded-md'
                        disabled = {loading}
                        type = "submit">
                            {todo?.todo?(loading?"Updating Todo":"Edit Todo"):(loading?"Adding Todo":"Add Todo")}
                        </button>
                        
                        <button 
                        className='bg-gray-400 text-white px-3 py-1 rounded-md'
                        onClick={()=>setIsAddTaskModalOpen((priv)=>!priv)}
                        type='button'>
                            Cancel
                        </button>
                    
                    </div>
                </div>

            </form>
        </div>
    </div>
  )
}

export default TodoAddForm