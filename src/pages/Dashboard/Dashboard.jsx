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
		setPeople(prev => [...prev, person]);
	}
	
	async function handleDeletePerson(id) {
		await deletePerson(id, accessToken);
		setPeople((prev) => prev.filter((p) => p.id !== id));
	}
	
	return (
	  <Layout>
	    <header className="dashboard-header">
		  <h1 className="dashboard-title">Your People</h1>
		  <AddPerson onAdded={handleAdded} />
		</header>
		
		<section className="people-list">
		  {people.map(p => (
		    <PersonCard
			  key={p.id}
			  person={p}
			  onDelete={handleDeletePerson}
			/>
		  ))}
		</section>
	  </Layout>
	);
}