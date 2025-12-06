//Filename: src/components/Layout/Layout.jsx

import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
	return (
	  <div className="layout-shell">
	    <nav className="layout-nav">
		  <Link to="/">Dashboard</Link>
		  <Link to="/import">Import / Export</Link>
		</nav>
		
		<div className="layout-content">
		  {children}
		</div>
	  </Shell>
	);
}