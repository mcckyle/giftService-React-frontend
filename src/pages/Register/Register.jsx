//Filename: src/pages/Register/Register.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        e.preventDefault();
        setError("");
		setSuccess("");
		
		if (form.password !== form.confirmPassword)
		{
			setError("Passwords do not match!");
			return;
		}
        
        try
        {
            const response = await registerUser(data);
			setSuccess("Account created successfully!");
			onRegister(data);
			
			const { accessToken } = response;
			
			setAccessToken(accessToken);
			
			navigate("/profile");
        }
        catch (error)
        {
            setErrorMessage("Unable to create the account!");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit}>
		  <h1 className="auth-title">Create Account</h1>
		  
		  {error && <p className="auth-error">{error}</p>}
		  {success && <p className="auth-success">{success}</p>}
		  
		  <input
		    className="auth-input"
			type="email"
			name="email"
			value={form.email}
			onChange={handleChange}
			placeholder="Email"
			required
		  />
		  
		  <input
		    className="auth-input"
			type="password"
			name="password"
			value={form.password}
			onChange={handleChange}
			placeholder="Password"
			required
		  />
		  
		  <input
		    className="auth-input"
			type="password"
			name="confirmPassword"
			value={form.confirmPassword}
			onChange={handleChange}
			placeholder="Confirm Password"
			required
		  />
		  
		  <button className="auth-button" type="submit">
		    Sign up
		  </button>
		</form>
	  </div>
	);
};

export default Register;
		  
		  