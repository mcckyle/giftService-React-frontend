//Filename: src/pages/Dashboard/Dashboard.jsx

import { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import PersonCard from "../../components/PersonCard/PersonCard.jsx";
import AddPerson from "../../components/AddPerson/AddPerson.jsx";
import { getPeople, deletePerson } from "../../services/PeopleService";
import { AuthContext } from "../../context/AuthContext";

import "./Dashboard.css";

export default function Dashboard() {
	const { accessToken } = useContext(AuthContext);
	const [people, setPeople] = useState([]);
	const isEmpty = people.length === 0;
	
	useEffect(() => {
		async function loadPeople() {
			const data = await getPeople(accessToken);
			setPeople(data || []);
		}
		loadPeople();
	}, [accessToken]);
	
	function handleAdded(person) {
		setPeople((prev) => [...prev, person]);
	}
	
	async function handleDeletePerson(id) {
		await deletePerson(id, accessToken);
		setPeople((prev) => prev.filter((p) => p.id !== id));
	}
	
	return (
	  <Layout>
	    <header className="dashboard-header">
		  <div className="dashboard-heading">
		    <h1 className="dashboard-title">Your People</h1>
			<p className="dashboard-subtitle">
			  A focused space for the people you care about most.
			</p>
		  </div>
		  
		  <AddPerson onAdded={handleAdded} />
		</header>
		
		{isEmpty ? (
		  <section className="dashboard-empty">
		    <div className="empty-icon" aria-hidden />
		    <h2>No one here yet</h2>
		    <p>
		      Add someone to start collecting gift ideas, meaningful notes,
			  and moments worth remembering.
		    </p>
		  </section>
		) : (
		  <section className="people-section">
		    <div className="people-list">
		      {people.map(person => (
		        <PersonCard
			      key={person.id}
			      person={person}
			      onDelete={handleDeletePerson}
			    />
		      ))}
			</div>
		  </section>
		)}
	  </Layout>
	);
}