//Filename: src/components/PersonCard/PersonCard.jsx

import { Link } from "react-router-dom";
import "./PersonCard.css";

export default function PersonCard({ person, onDelete }) {
	return (
	  <div className="person-card">
		<h3>{person.name}</h3>
		
		<div className="actions">
		  <Link to={`/person/${person.id}`}>
		    <button className="button small">View Gifts</button>
		  </Link>
		  
		  <Link to={`/person/${person.id}/edit`}>
		    <button className="button small secondary">Edit</button>
		  </Link>
		  
		  <button
		    className="button small danger"
			onClick={() => onDelete(person.id)}
		  >
		    Delete
		  </button>
	    </div>
	  </div>
	);
}