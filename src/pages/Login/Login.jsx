//Filename: src/pages/Login/Login.jsx

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../Auth/Auth.css";

const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
	
	const onSubmit = async (data) => {
		setErrorMessage("");
		
		if ( ( ! data.email) || ( ! data.password))
		{
			setErrorMessage("Both fields are required!");
			return;
		}
        
        try
        {
			await login(data);
            navigate("/dashboard");
        }
        catch (error)
        {
            setErrorMessage("Invalid email or password!");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
		  <h1 className="auth-title">Sign in</h1>
		  
		  {errorMessage && <p className="auth-error">{errorMessage}</p>}
		  
		  <input
		    className="auth-input"
			type="email"
			placeholder="Email"
			{...register("email", { required: true })}
		  />
		  {errors.email && <p className="input-error">Email is required!</p>}
		  
		  <input
		    className="auth-input"
			type="password"
			placeholder="Password"
			{...register("password", { required: true })}
		  />
		  {errors.password && <p className="input-error">Password is required!</p>}
		  
		  <button className="auth-button" type="submit">
		    Continue
		  </button>
		</form>
	  </div>
	);
};

export default Login;