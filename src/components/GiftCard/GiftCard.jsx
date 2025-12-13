//Filename: /src/components/GiftCard/GiftCard.jsx

import { useState } from "react";
import EditGift from "../EditGift/EditGift";
import "./GiftCard.css";

export default function GiftCard({ gift, onUpdated }) {
	const [open, setOpen] = useState(false);
	
	function handleOpen(e) {
		e.stopPropagation();
		setOpen(true);
	}
	
	return (
	  <>
	    <div
		  className={`gift-card ${gift.purchased ? "is-purchased" : ""}`}
		  onClick={() => setOpen(true)}
		>
		  <header className="gift-card-header">
	        <h3 className="gift-title">{gift.title}</h3>
		  
		  <button
		    className="gift-edit-btn"
			onClick={handleOpen}
		  >
		    Edit
		  </button>
		</header>
		  
		{gift.price && (
		    <p className="gift-price">${Number(gift.price).toFixed(2)}</p>
		)}
		
		{gift.url && (
		    <a
			  href={gift.url}
			  target="_blank"
			  rel="noopener noreferrer"
			  className="gift-url"
			  onClick={(e) => e.stopPropagation()}
			>
			  View Link
			</a>
		  )}
	    </div>
		
		{open && (
		  <EditGift
		    gift={gift}
			onClose={() => setOpen(false)}
			onUpdated={onUpdated}
		  />
		)}
	  </>
	);
}