import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TodoAddForm from './TodoAddForm';
import {deleteTodo,updateTodo} from '../api/todoApi.js'

function TodoRow({todo,onTodoUpdated,...props}) {

    const[isEditTaskModalOpen,setIsEditTaskModalOpen] = useState(false)

    const [status,setStatus] = useState(todo.completed)

    const handlesStatusToggle = async() =>{
        console.log(todo.id);
        const updateRes = await updateTodo(todo.id,{completed:status})
        console.log('toggled_successfully',updateRes);
        setStatus((priv)=>!priv)
        onTodoUpdated();
    }

    const handleDeleteVideo = async() => {
        console.log(todo.id);
        const delRes = await deleteTodo(todo.id)
        console.log('deleted_successfully',delRes);
        onTodoUpdated();
    }

  return (
    <div className='bg-white px-2 flex justify-between items-center h-10 rounded-md'
    {...props}>
        <div className='flex gap-2'>
            <input type="checkbox" checked = {status}
            onChange={handlesStatusToggle}/>
            <p className={status?"line-through text-gray-400":""}>{todo?.todo}</p>
        </div>
        <div className='flex gap-2'>
            <div className='bg-slate-200 w-6 rounded-md flex justify-center items-center'>
                <FontAwesomeIcon 
                icon={faPen}
                onClick={()=>{setIsEditTaskModalOpen((priv)=>!priv)}} 
                className="text-gray-400 cursor-pointer" />
            </div>
            <div className='bg-slate-200 h-6 w-6 rounded-md flex justify-center items-center'>
                <FontAwesomeIcon 
                icon={faTrash}
                onClick={handleDeleteVideo}
                className="text-gray-400 cursor-pointer" />
            </div>
        </div>

        {
            isEditTaskModalOpen && <TodoAddForm todo = {todo} setIsAddTaskModalOpen = {setIsEditTaskModalOpen} onTodoUpdated = {onTodoUpdated}/>
        }

    </div>
  )
}

export default TodoRow