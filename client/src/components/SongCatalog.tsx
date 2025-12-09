import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import SongCard from "./SongCard.tsx";
import { getSongs } from "../requests/SongRequests.ts";
import MUIEditSongModal from "./MUIEditSongModal.tsx";
import AuthContext from "../auth/index.tsx";

export default function SongCatalog() {

    const [songs, setSongs] = useState([]);
    const [visible, setVisible] = useState(false);
    const {auth} = useContext(AuthContext);
    const [currentSong, setCurrentSong] = useState<{ title: string, artist: string, year: number, ytId: string } | undefined>(undefined);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const query = {
            title: formData.get('song-title') ? formData.get('song-title') as string : undefined,
            artist: formData.get('song-artist') ? formData.get('song-artist') as string : undefined,
            year: formData.get('song-year') ? Number(formData.get('song-year')) : undefined
        };
        
        getSongs(query).then(async (response) => {
            let songsList = await response.json();

            console.log(`Query: ${JSON.stringify(query)} found songs: ${JSON.stringify(songsList.songs)}`);
            setSongs(songsList.songs);
        }).catch((error) => {
            console.log(error);
        });

    }

    const addSong = () => {
        console.log("AHAHAH");
        console.log(auth.user? auth.user : {username: null, email: null, avatar: null});
    }

    const editSong = (index: number) => {
        console.log(`Edit song at index: ${index}`);
        setVisible(true);
        setCurrentSong(songs.find((_, i) => i === index));

    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <>
            <h1> Song Catalog Page </h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <div id = "song-query" style={{borderRight: '1px solid white', padding: '1vw'}}>
                    <Box component = "form" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
                        <TextField name="song-title" label="Song Title" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField name="song-artist" label="Artist" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <TextField type="number" name="song-year" label="Release Year" variant="outlined" sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                        <Button type = "submit" variant="outlined"> Search Songs </Button>
                    </Box>
                </div>
                <div id = "songs-list">
                    <div id="overflow-container" style={{ maxHeight: '30vh', overflowY: 'auto', paddingRight: '10px', flexGrow: 1, border: '1px solid white', padding: '10px' }}>
                        {songs.map((song, index) => (
                            <SongCard index={index} song={song} editSong={editSong} />
                        ))
                        }
                    </div>
                    {auth.loggedIn?<Button id="add-song" variant="contained" sx={{ marginTop: '10px' }} onClick={addSong}> + New Song </Button> : <></>}
                    
                </div>
                {visible?< MUIEditSongModal closeModal = {closeModal} song={currentSong} /> : <></>}
            </div>
        </>
    )
}