//Filename: src/pages/Register/Register.jsx

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useContext(AuthContext);
	
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	
	const onSubmit = async (data) => {
		setErrorMessage("");
		setSuccessMessage("");
		
		//Password Match Check.
		if (data.password !== data.confirmPassword)
		{
			setErrorMessage("Passwords do not match!");
			return;
		}
        
        try
        {
			const response = await registerUser(data);
			setSuccessMessage("Account created successfully!");
			
			const { accessToken } = response;
			
			setAccessToken(accessToken);
			
			setUser({
				username: response.username,
				email: response.email
			});
			
			navigate("/profile");
        }
        catch (error)
        {
            setErrorMessage("Unable to create the account!");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
		  <h1 className="auth-title">Create Account</h1>
		  
		  {errorMessage && <p className="auth-error">{errorMessage}</p>}
		  {successMessage && <p className="auth-success">{successMessage}</p>}
		  
		  {/* Username Field. */}
		  <input
		    className="auth-input"
			type="text"
			placeholder="Username"
			{...register("username", { required: true })}
		  />
		  {errors.username && <p className="input-error">Username is required!</p>}
		  
		  {/* Email Field. */}
		  <input
		    className="auth-input"
			type="email"
			placeholder="Email"
			{...register("email", { required: true })}
		  />
		  {errors.email && <p className="input-error">Email is required!</p>}
		  
		  {/* Password Field. */}
		  <input
		    className="auth-input"
			type="password"
			placeholder="Password"
			{...register("password", { required: true })}
		  />
		  {errors.password && <p className="input-error">Password is required!</p>}
		  
		  {/* Confirm Password Field. */}
		  <input
		    className="auth-input"
			type="password"
			placeholder="Confirm Password"
			{...register("confirmPassword", { required: true })}
		  />
		  {errors.confirmPassword && <p className="input-error">Confirm your password!</p>}
		  
		  {/* Submit Button. */}
		  <button className="auth-button" type="submit">
		    Sign up
		  </button>
		</form>
	  </div>
	);
};

export default Register;