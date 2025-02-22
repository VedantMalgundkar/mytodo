import axiosInstance from "./axiosInstance";


export const getTodos = async (limit = 10,skip = 0) =>{

    const response = await axiosInstance.get("/todos",
        {
            params: {
                limit,
                skip
            }
        }
    );
    return response.data;

}

export const updateTodo = async (id,data) =>{
    try {
        const response = await axiosInstance.patch(`/todos/${id}`,data);
        return response.data
    } catch (error) {
        console.error("Error updating todo:", error.response ? error.response.data : error.message);
        throw error;
    }

}
export const AddTodo = async (data) =>{
    try {
        const response = await axiosInstance.post(`/todos/add`,{...data});
        return response.data
    } catch (error) {
        console.error("Error adding todo:", error.response ? error.response.data : error.message);
        throw error;
    }

}

export const deleteTodo = async (id) =>{
    try {
        const response = await axiosInstance.delete(`/todos/${id}`);
        return response.data
    } catch (error) {
        console.error("Error deleting todo:", error.response ? error.response.data : error.message);
        throw error;
    }

}