import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import PlaylistCard from "./PlaylistCard.tsx";
import { getLists } from "../requests/PlaylistRequests.ts";

export default function PlaylistsView() {

    const [lists, setLists] = useState([]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        const formData = new FormData(event.currentTarget);    
        const query = {
            username: formData.get('playlist-name') ? formData.get('playlist-name') as string : undefined,
            ownerEmail: formData.get('owner-email') ? formData.get('owner-email') as string : undefined,
            title: formData.get('song-title') ? formData.get('song-title') as string : undefined,
            artist: formData.get('song-artist') ? formData.get('song-artist') as string : undefined,
            releaseYear: formData.get('song-year') ? Number(formData.get('song-year')) : undefined
        };

        getLists(query).then(async (response) => {
            let songsList = await response.json();
            console.log(`Query: ${JSON.stringify(query)} found songs: ${JSON.stringify(songsList.songs)}`);
            setLists(songsList.playlists);
        }).catch((error) => {
            console.log(error);
        });


    }

    const addList = () => {
        console.log("AHAHAH");
    }


    return (
        <>
            <h1> Song Catalog Page </h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <div id = "song-query" style={{borderRight: '1px solid white', padding: '1vw'}}>
                    <Box component = "form" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
                        <TextField type="text" name="playlist-name" label="Playlist Name" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField type="text" name="owner-email" label="Owner Email" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField name="song-title" label="Song Title" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField name="song-artist" label="Artist" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField type="number" name="song-year" label="Release Year" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <Button type = "submit" variant="outlined"> Search Lists </Button>
                    </Box>
                </div>
                <div id = "songs-list">
                    <div id="overflow-container" style={{ maxHeight: '30vh', overflowY: 'auto', paddingRight: '10px', flexGrow: 1, border: '1px solid white', padding: '10px' }}>
                        {lists.map((list, index) => (
                            <PlaylistCard index={index} list={list} />
                        ))
                        }
                    </div>
                    <Button id="add-playlist" variant="contained" sx={{ marginTop: '10px' }} onClick={addList}> + New Playlist </Button>
                </div>
            </div>
        </>
    )
}