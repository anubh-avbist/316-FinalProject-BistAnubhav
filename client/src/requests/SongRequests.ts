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
            year: query.releaseYear
        }),
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }

    return response;
}

export async function saveSong(song: { title: string; artist: string; year: number; ytId: string }, updatedSong: { title?: string; artist?: string; year?: number }) {
    const oldQuery = {
        title: song?.title,
        artist: song?.artist,
        year: song?.year
    }

    const id = await getSongs(oldQuery).then(async (response) => {
        const songsList = await response.json();
        let songs = songsList.songs;
        const song = songs[0];
        return song._id;
    });
    const url = "http://localhost:4000/api/song/"+id;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSong),
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }

    return response;
}

const apis = {
    getSongs,
    saveSong
}

export default apis;