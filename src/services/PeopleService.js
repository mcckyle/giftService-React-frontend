//Filename: src/services/PeopleService.js

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getPeople(token)
{
	const response = await fetch(`${API}/api/person`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	
	return response.json();
}

//Get one person from list.
export async function getPerson(personId, token)
{
	const people = await getPeople(token);
	return people.find(p => p.id === Number(personId));
}

export async function createPerson(data, token)
{
	const response = await fetch(`${API}/api/person`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	
	return response.json();
}

export async function updatePerson(personId, data, token)
{
	const response = await fetch(`${API}/api/person/${personId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	
	return response.json();
}

export async function deletePerson(personId, token)
{
	const response = await fetch(`${API}/api/person/${personId}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` }
	});
	
	if ( ! response.ok) {
		throw new Error("Failed to delete person!");
	}
	
	return;
}