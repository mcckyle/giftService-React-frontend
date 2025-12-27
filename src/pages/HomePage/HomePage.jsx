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
			  Plan Gifts with Intention
			</h1>
			
			<p className="home-subtitle">
		      A simple, modern space to organize gift ideas, track recipients,
			  and give more meaningfully - without the stress.
		    </p>
			
			<div className="home-actions">
		      <Link to="/dashboard" className="home-btn">
			    Go to Dashboard
			  </Link>
		    </div>
		</section>
		
		{/* Feature Cards Grid. */}
		<section className="home-grid">
		  <article className="home-card">
		    <h2 className="card-title">Stay Organized</h2>
			<p className="card-text">
			  Keep gift ideas, occasions and progress neatly organized
			  in one place.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Capture Ideas Instantly</h2>
			<p className="card-text">
			  Save inspiration the moment it strikes so nothing thoughtful
			  slips away.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Give with Purpose</h2>
			<p className="card-text">
			  Build meaningful gift histories that make every gesture
			  feel personal.
			</p>
		  </article>
		</section>
	  </main>
	);
};

export default HomePage;