//Filename: /src/pages/PersonDetail/PersonDetail.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout.jsx";
import GiftCard from "../../components/GiftCard/GiftCard.jsx";
import AddGift from "../../components/AddGift/AddGift.jsx";
import { getGifts } from "../../services/GiftService";
import { AuthContext } from "../../context/AuthContext";

export default function PersonDetail() {
	const { id } = useParams();
	const { accessToken } = useContext(AuthContext);
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		async function load() {
			const data = await getGifts(id, accessToken);
			setGifts(data);
		}
		load();
	}, [id, accessToken]);
	
	function handleAdded(gift) {
		setGifts(prev => [...prev, gift]);
	}
	
	function handleGiftUpdated(updatedGift) {
		setGifts(prev =>
		  prev.map(g => (g.id === updatedGift.id ? updatedGift : g))
		);
	}
	
	return (
	  <Layout>
	    <h1>Gift Ideas</h1>
		
		<AddGift personId={id} onAdded={handleAdded} />
		
		<div style={{ marginTop: "1rem" }}>
		  {gifts.map(g => (
		    <GiftCard
			  key={g.id}
			  gift={g}
			  onUpdated={handleGiftUpdated}
			/>
		  ))}
		</div>
	  </Layout>
	);
}