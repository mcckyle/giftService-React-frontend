//Filename: src/pages/HomePage/HomePage.jsx

import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	return (
	  <main className="home">
	    {/* Hero Section. */}
	    <section className="home-hero">
		  <span className="home-eyebrow">Thoughtful Gifting</span>
		  
		    <h1 className="home-title">
			  Plan gifts with intention
			</h1>
			
			<p className="home-subtitle">
		      A simple, modern space to organize gift ideas, remember meaningful
			  details, and give with clarity - not stress.
		    </p>
			
			<div className="home-actions">
		      <Link to="/dashboard" className="home-cta">
			    Open Dashboard
			  </Link>
		    </div>
		</section>
		
		{/* Feature Cards Grid. */}
		<section className="home-grid">
		  <article className="home-card">
		    <h2 className="card-title">Stay Organized</h2>
			<p className="card-text">
			  Keep people, occasions, and gift ideas structured and easy to revisit.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Capture Ideas Instantly</h2>
			<p className="card-text">
			  Save inspiration the moment it appears - no notes app required.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Give with Purpose</h2>
			<p className="card-text">
			  Build thoughtful gift histories that make every gesture feel personal.
			</p>
		  </article>
		</section>
	  </main>
	);
};

export default HomePage;