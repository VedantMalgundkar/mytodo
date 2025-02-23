import React,{useState,useEffect} from 'react'
import TodoRow from '../components/TodoRow.jsx'
import TodoAddForm from '../components/TodoAddForm.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import Left & Right Arrows
import {getTodos} from "../api/todoApi.js"
import {AuthContext} from "../context/Authcontext.jsx"
import { useContext } from "react";
import { useDebounce } from 'use-debounce';


function Todo() {

    const[isAddTaskModalOpen,setIsAddTaskModalOpen] = useState(false)
    const [refreshTodos, setRefreshTodos] = useState(false);

    const { user,logout } = useContext(AuthContext);
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)
    const[todos,setTodos] = useState({})

    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        query: '',
        status: 'all'
      });

    const [debouncedQuery] = useDebounce(filters.query,500);
      
    const [pagination, setPagination] = useState({
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false
    });
    
    const fetchTodos = async () => {
        try {
          setLoading(true);
        
          const params = new URLSearchParams({
            page: filters.page,
            limit: filters.limit,
            ...(debouncedQuery && { query: debouncedQuery }),
            ...(filters.status !== 'all' && { status: filters.status === 'completed' })
          });
          
          const response = await getTodos(params)
           
          console.log(response.request.responseURL);
          
          setTodos(response.data.data.docs);
          setPagination({
            totalPages: response.data.data.totalPages,
            hasPrevPage: response.data.data.hasPrevPage,
            hasNextPage: response.data.data.hasNextPage
          });
        } catch (err) {
            setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [filters.page, filters.limit, debouncedQuery, filters.status, refreshTodos]);

    const handleSearch = (e) => {
        setFilters(prev => ({ ...prev, query: e.target.value }));
    };
    
    const handleStatusChange = (e) => {
        setFilters(prev => ({ ...prev, status: e.target.value,page:1}));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    const handleLimitChange = (e) => {
        setFilters(prev => ({...prev,limit:Number(e.target.value),page:1}))
    }

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading...</div>;

  return (
    <div className='flex justify-center bg-[rgb(248,247,255)]'>
        <div className='border-2 border-black w-4/6'>
        
        {
            user && (
                <div className='text-right p-1'>
                    <button className='px-2 py-1 bg-red-500 text-white rounded-md'
                    onClick={logout}>
                        Logout
                    </button>
                </div>
            )
        }
        
        <p className='text-3xl font-bold my-5 text-center'>Todo List</p>
        <div className='flex items-center justify-between m-2'>
            <div className='flex gap-2'>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md'
                onClick={()=>setIsAddTaskModalOpen((priv)=>!priv)}>
                    Add Task
                </button>
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={filters.query}
                    onChange={handleSearch}
                    />
            </div>
            <div className='flex gap-2'>
                <select 
                value={filters.status}
                onChange={handleStatusChange}
                className='bg-slate-200 rounded-md' name="status-pg" id="status-pg">
                    <option value ="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>

                <select className='bg-slate-200 rounded-md' 
                name="noOfTodoPerPage" 
                value={filters.limit}
                onChange={handleLimitChange}
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
                todos?.map((todo)=>{
                    return <TodoRow todo={todo} key={todo._id} onTodoUpdated={() => setRefreshTodos((prev) => !prev)} /> // setIsEditTaskModalOpen={setIsEditTaskModalOpen} isEditTaskModalOpen = {isEditTaskModalOpen} />
                })
            }
        </div>

        {
            isAddTaskModalOpen && <TodoAddForm setIsAddTaskModalOpen = {setIsAddTaskModalOpen} onTodoUpdated={() => setRefreshTodos((prev) => !prev)} />
        }

        <div className='flex justify-evenly'>
            <button
            className='bg-slate-200 w-6 rounded-md'
            onClick={()=>handlePageChange(filters.page>1?filters.page-1:filters.page)}>
                <FontAwesomeIcon 
                icon={faArrowLeft} 
                className="cursor-pointer bg-slate-200 text-gray-400" />
            </button>
            <span>{filters.page}/{pagination?.totalPages}</span>
            <button
            className='bg-slate-200 w-6 rounded-md'
            onClick={()=>handlePageChange(filters.page<pagination?.totalPages?filters.page+1:filters.page)}>
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