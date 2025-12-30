//Filename: /src/pages/PersonDetail/PersonDetail.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout.jsx";
import GiftCard from "../../components/GiftCard/GiftCard.jsx";
import AddGift from "../../components/AddGift/AddGift.jsx";
import { getGifts } from "../../services/GiftService";
import { AuthContext } from "../../context/AuthContext";

import "./PersonDetail.css";

export default function PersonDetail() {
	const { id } = useParams();
	const { accessToken } = useContext(AuthContext);
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		async function load() {
			const data = await getGifts(id, accessToken);
			setGifts(data || []);
		}
		load();
	}, [id, accessToken]);
	
	function handleAdded(gift) {
		setGifts((prev) => [...prev, gift]);
	}
	
	function handleGiftUpdated(updatedGift) {
		setGifts((prev) =>
		  prev.map((g) => (g.id === updatedGift.id ? updatedGift : g))
		);
	}
	
	function handleGiftDeleted(deletedId) {
		setGifts((prev) =>
		  prev.filter((g) => g.id !== deletedId)
		);
	}
	
	return (
	  <Layout>
	    <header className="person-detail-header">
		  <div className="person-detail-heading">
		    <h1 className="person-detail-title">Gift ideas</h1>
			<p className="person-detail-subtitle">
			  Save small thoughts as they appear. Even the simplest idea can grow
			  into something meaningful later.
			</p>
		  </div>
		  
		  <AddGift personId={id} onAdded={handleAdded} />
		</header>
		
		{gifts.length === 0 ? (	
		  <div className="person-detail-empty">
		    <h2>No ideas yet</h2>
			<p>
			  Start small. A single thought, note, or reminder is often enough to spark
			  the perfect gift later.
			</p>
		  </div>
		) : (
			<section className="gifts-grid">
			  {gifts.map((g) => (
				<GiftCard
				  key={g.id}
				  gift={g}
				  onUpdated={handleGiftUpdated}
				  onDeleted={handleGiftDeleted}
				/>
			  ))}
			</section>
		)}
	  </Layout>
	);
}