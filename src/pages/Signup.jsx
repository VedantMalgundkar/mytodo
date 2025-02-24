import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/Authcontext.jsx";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const { signUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const result = await signUp(data.fullName,data.email, data.password);
        if (result.success) {
            navigate("/login");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="full name"
                    {...register("fullName", { required: "full name is required" })}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="border p-2"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    className="border p-2"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
            <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
    );
}

export default Signup;
