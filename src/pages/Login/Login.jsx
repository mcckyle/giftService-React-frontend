//Filename: src/pages/Login/Login.jsx

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../Auth/Auth.css";

const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
	
	async function onSubmit(data) {
		setErrorMessage("");
		
		try
        {
			await login(data);
            navigate("/dashboard");
        }
        catch
        {
            setErrorMessage("Invalid email or password!");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
		  <header className="auth-header">
		    <h1>Welcome back</h1>
			<p>Sign in to continue planning.</p>
		  </header>
		  
		  {errorMessage && <p className="auth-error">{errorMessage}</p>}
		  
		  <div className="auth-fields">
		    <input
		      className="auth-input"
			  type="email"
			  placeholder="Email"
			  autoComplete="email"
			  {...register("email", { required: true })}
		    />
		    {errors.email && <span className="input-error">Required</span>}
		  
		    <input
		      className="auth-input"
			  type="password"
			  placeholder="Password"
			  autoComplete="current-password"
			  {...register("password", { required: true })}
		    />
		    {errors.password && <span className="input-error">Required</span>}
		  </div>
		  
		  <button className="auth-button" type="submit">
		    Continue
		  </button>
		  
		  <p className="auth-footer">
		    New here? <Link to="/register">Create an account</Link>
		  </p>
		</form>
	  </div>
	);
};

export default Login;