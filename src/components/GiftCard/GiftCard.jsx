//Filename: /src/components/GiftCard/GiftCard.jsx

import "./GiftCard.css";

export default function GiftCard({ gift }) {
	return (
	  <div className={`gift-card ${gift.purchased ? "purchased" : ""}`}>
	    <h3>{gift.title}</h3>
	  </div>
	);
}