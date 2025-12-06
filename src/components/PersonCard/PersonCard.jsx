//Filename: src/components/PersonCard/PersonCard.jsx

import { Link } from "react-router-dom";
import "./PersonCard.css";

export default function PersonCard({ person }) {
	return (
	  <div className="person-card">
	    <div>
		  <h3>{person.name}</h3>
		</div>
		<Link to="{`/person/${person.id}`}>
		  <button>View Gifts</button>
		</Link>
	  </div>
	);
}