export async function getSongs(query: { title?: string ; artist?: string; releaseYear?: number }) {
    const url = "http://localhost:4000/api/songs";
    
    const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
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
    getSongs
}

export default apis;