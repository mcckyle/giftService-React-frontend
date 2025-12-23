//Filename: src/pages/HomePage/HomePage.jsx

import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	return (
	  <div className="home">
	    {/* Hero Section. */}
	    <section className="home-hero">
		  <span className="home-eyebrow">Thoughtful Gifting</span>
		  
		    <h1 className="home-title">
			  Plan Gifts with Ease
			</h1>
			
			<p className="home-subtitle">
		      Organize ideas, track recipients, and create meaningful gifts
			  without the stress.
		    </p>
			
			<div className="home-actions">
		      <Link to="/dashboard" className="home-btn">
			    Open Dashboard
			  </Link>
		    </div>
		</section>
		
		{/* Feature Cards. */}
		<section className="home-grid">
		  <article className="home-card">
		    <h2 className="card-title">Stay Organized</h2>
			<p className="card-text">
			  Track occasions, gift ideas, and progress neatly in one place.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Capture Ideas Instantly</h2>
			<p className="card-text">
			  Save inspiration the moment it strikes so nothing meaningful is lost.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Give with Intention</h2>
			<p className="card-text">
			  Build thoughtful gift histories that make every gift feel personal.
			</p>
		  </article>
		</section>
	  </div>
	);
};

export default HomePage;