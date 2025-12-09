//Filename: src/services/GiftService.js

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getGifts(personId, token)
{
	const response = await fetch(`${API}/api/gifts/person/${personId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.json();
}

export async function createGift(personId, data, token)
{
	const response = await fetch(`${API}/api/gifts/${personId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	
	return response.json();
}

//Update a gift.
export async function updateGift(id, payload, token)
{
	const response = await fetch(`${API}/api/gifts/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});
	
	if ( ! response.ok)
	{
		throw new Error("Failed to update the gift!");
	}
	
	return response.json();
}