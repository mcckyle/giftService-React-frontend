//Filename: src/pages/Register/Register.jsx

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "../Auth/Auth.css";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState("");
	
	async function onSubmit(data) {
		setErrorMessage("");
		
		//Password Match Check.
		if (data.password !== data.confirmPassword)
		{
			setErrorMessage("Passwords do not match!");
			return;
		}
        
        try
        {
			const response = await registerUser(data);
			
			setAccessToken(response.accessToken);
			setUser({ username: response.username, email: response.email });
			
			navigate("/dashboard");
        }
        catch
        {
            setErrorMessage("Unable to create account. Please try again.");
        }
    };

    return (
      <div className="auth-container">
	    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
		  <header className="auth-header">
		    <h1>Create Account</h1>
			<p>Plan gifts simply and thoughtfully.</p>
		  </header>
		  
		  {errorMessage && <p className="auth-error">{errorMessage}</p>}
		  
		  {/* Username Field. */}
		  <div className="auth-fields">
		    <input
		      className="auth-input"
			  placeholder="Username"
			  autoComplete="username"
			  {...register("username", { required: true })}
		    />
		    {errors.username && <span className="input-error">Required</span>}
		  
		    {/* Email Field. */}
		    <input
		      className="auth-input"
			  type="email"
			  placeholder="Email"
			  autoComplete="email"
			  {...register("email", { required: true })}
		    />
			{errors.email && <span className="input-error">Required</span>}
		  
		    {/* Password Field. */}
		    <input
		      className="auth-input"
			  type="password"
			  placeholder="Password"
			  autoComplete="new-password"
			  {...register("password", { required: true })}
		    />
		    {errors.password && <span className="input-error">Required</span>}
		  
		    {/* Confirm Password Field. */}
		    <input
		      className="auth-input"
			  type="password"
			  placeholder="Confirm Password"
			  autoComplete="new-password"
			  {...register("confirmPassword", { required: true })}
		    />
		    {errors.confirmPassword && <span className="input-error">Required</span>}
		  </div>
		  
		  {/* Submit Button. */}
		  <button className="auth-button" type="submit">
		    Create account
		  </button>
		  
		  <p className="auth-footer">
		    Already have an account? <Link to="/login">Sign in</Link>
		  </p>
		</form>
	  </div>
	);
};

export default Register;