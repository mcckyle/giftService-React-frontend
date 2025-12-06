//Filename: src/pages/Dashboard/Dashboard.jsx

import { useEffect, useState } from "react";
import { PersonAPI } from "../api/client";
import Layout from "../../components/Layout/Layout.jsx";
import PersonCard from "../../components/PersonCard/PersonCard.jsx";

import "./Dashboard.css";

export default function Dashboard() {
	const [people, setPeople] = useState([]);
	
	useEffect(() => {
		PersonAPI.getMyPeople().then(setPeople);
	}, []);
	
	return (
	  <Layout>
	    <h1>Your People</h1>
		
		<div className="people-list">
		  {people.map(p => (
		    <PersonCard key={p.id} person={p} />
		  ))}
		</div>
	  </Layout>
	);
}