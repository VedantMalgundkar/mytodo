import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/Authcontext.jsx";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
        const result = await login(data.username, data.password);
        if (result.success) {
            navigate("/todo");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="username"
                    {...register("username", { required: "username is required" })}
                    className="border p-2"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    className="border p-2"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
    );
}

export default Login;
