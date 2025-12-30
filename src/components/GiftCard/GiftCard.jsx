//Filename: /src/components/GiftCard/GiftCard.jsx

import { useState } from "react";
import EditGift from "../EditGift/EditGift";
import "./GiftCard.css";

export default function GiftCard({ gift, onUpdated, onDeleted }) {
	const [open, setOpen] = useState(false);
	
	function openEditor(e) {
		e.stopPropagation();
		setOpen(true);
	}
	
	return (
	  <>
	    <article
		  className={`gift-card ${gift.purchased ? "is-purchased" : ""}`}
		  onClick={() => setOpen(true)}
		  role="button"
		  tabIndex={0}
		>
		  <header className="gift-card-header">
	        <h3 className="gift-title">{gift.title}</h3>
		  
		    <button
			  type="button"
		      className="gift-edit-btn"
			  onClick={openEditor}
			  aria-label="Edit gift"
		    >
		      Edit
		    </button>
		  </header>
		  
		  {gift.price && (
		    <p className="gift-price">
			  ${Number(gift.price).toFixed(2)}
			</p>
		  )}
		
		  {gift.url && (
		    <a
			  href={gift.url}
			  target="_blank"
			  rel="noopener noreferrer"
			  className="gift-link"
			  onClick={(e) => e.stopPropagation()}
			>
			  View Link →
			</a>
		    )}
	    </article>
		
		{open && (
		  <EditGift
		    gift={gift}
			onClose={() => setOpen(false)}
			onUpdated={onUpdated}
			onDeleted={onDeleted}
		  />
		)}
	  </>
	);
}