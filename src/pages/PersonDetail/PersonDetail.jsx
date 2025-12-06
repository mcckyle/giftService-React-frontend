//Filename: /src/pages/PersonDetail.jsx
import { useEffect, useState } from "react";
import { GiftAPI } from "../api/client";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import GiftCard from "../components/GiftCard";

export default function PersonDetail() {
	const { id } = useParams();
	const [gifts, setGifts] = useState([]);
	
	const load = async () => {
		const response = await GiftAPI.getGiftsForPerson(id);
		setGifts(response.data);
	};
	
	useEffect(() => {
		load();
	}, [id]);
	
	return (
	  <Layout>
	    <h1>Gift Ideas</h1>
		<div style={{ marginTop: "1rem" }}>
		  {gifts.map(g => <GiftCard key={g.id} gift={g} /> )}
		</div>
	  </Layout>
	);
}