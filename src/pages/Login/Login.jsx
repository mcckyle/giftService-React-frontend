//Filename: src/pages/Login/Login.jsx

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        e.preventDefault();
        setErrorMessage("");
        
        try
        {
			await login(data);
            navigate("/profile");
        }
        catch (error)
        {
            setError("Invalid email or password!");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit}>
		  <h1 className="auth-title">Sign in</h1>
		  
		  {error && <p className="auth-error">{error}</p>}
		  
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
		  
		  <button className="auth-button" type="submit">
		    Continue
		  </button>
		</form>
	  </div>
	);
};

export default Login;