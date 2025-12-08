export async function getLists(query: { username?: string ; ownerEmail?: string ; title?: string ; artist?: string; releaseYear?: number }) {
    const url = "http://localhost:4000/api/get_lists";
    
    const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            username: query.username,
            ownerEmail: query.ownerEmail,
            title: query.title,
            artist: query.artist,
            releaseYear: query.releaseYear
        }),
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }

    return response;
}

const apis = {
    getLists
}

export default apis;