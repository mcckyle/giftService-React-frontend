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
	
	useEffect(() => {
		async function load() {
			const data = await getPeople(accessToken);
			setPeople(data || []);
		}
		load();
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
			  A simple place to organize everyone that you enjoy gifting to.
			</p>
		  </div>
		  
		  <AddPerson onAdded={handleAdded} />
		</header>
		
		{people.length === 0 ? (
		  <div className="dashboard-empty">
		    <h2>Start your gift list</h2>
		    <p>
		      Add someone to begin collecting thoughtful gift ideas and memories.
		    </p>
		  </div>
		) : (
		  <section className="people-list">
		    {people.map(p => (
		      <PersonCard
			    key={p.id}
			    person={p}
			    onDelete={handleDeletePerson}
			  />
		    ))}
		  </section>
		)}
	  </Layout>
	);
}