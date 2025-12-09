//Filename: /src/components/GiftCard/GiftCard.jsx

import { useState } from "react";
import EditGift from "../EditGift/EditGift";
import "./GiftCard.css";

export default function GiftCard({ gift, onUpdated }) {
	const [open, setOpen] = useState(false);
	
	function openModal(e) {
		e.stopPropagation();
		setOpen(true);
	}
	
	return (
	  <>
	    <div className={`gift-card ${gift.purchased ? "purchased" : ""}`} onClick={() => setOpen(true)}>
		  <div className="gift-card-header">
	      <h3>{gift.title}</h3>
		  
		  <button
		    className="gift-edit-btn"
			onClick={openModal}
		  >
		    Edit
		  </button>
		</div>
		  
		  {gift.price && (
		    <p className="gift-price">
			  ${Number(gift.price).toFixed(2)}
			</p>
		  )}
		  
		  {gift.url && (
		    <a
			  className="gift-url"
			  href={gift.url}
			  onClick={(e) => e.stopPropagation()}
			  target="_blank"
			  rel="noopener noreferrer"
			>
			  Link
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