//Filename: src/pages/HomePage/HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	return (
	  <div className="home">
	    <section className="home-hero">
		  <h1 className="home-title">Plan Gifts with Ease</h1>
		  <p className="home-subtitle">
		    Organize your ideas, track your recipients, and make gifting meaningful and stress-free.
		  </p>
		  
		  <div className="home-actions">
		    <Link to="/dashboard" className="home-btn">Dashboard</Link>
		  </div>
		</section>
		
		<section className="home-content">
		  <div className="home-card">
		    <h2>Stay Organized</h2>
			<p>
			  Track occasions, gift ideas, and progress all year long.
			</p>
		  </div>
		  
		  <div className="home-card">
		    <h2>Save Ideas Effortlessly</h2>
			<p>
			  Capture inspiration instantly so nothing meaningful slips away.
			</p>
		  </div>
		  
		  <div className="home-card">
		    <h2>Make Every Gift Count</h2>
			<p>
			  Build thoughtful gift histories to give with intention.
			</p>
		  </div>
		</section>
		
	  </div>
	);
};

export default HomePage;