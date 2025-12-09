import { Box, Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth";

export default function SongCard({ index, song, editSong }: { index: number, song: { title: string, artist: string, year: number, songPlays: number, ytId: string, ownerEmail: string }, editSong: (index: number) => void }) {
       
    const { auth } = useContext(AuthContext)
    const user = auth.user? auth.user : {username: null, email: null, avatar: null};

    return (
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
                border: '1px solid black',
                padding: '1vw',
                backgroundColor: 'beige',
            }}
            key={index}
            id={'song-' + index + '-card'}
        >
            {index + 1}.
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                    
                <a
                    id={'song-' + index + '-link'}
                    className="song-link"
                    href={"https://www.youtube.com/watch?v=" + song.ytId}>
                    {song.title} ({song.year}) by {song.artist}
                </a>
                <p style={{ color: 'black' }} >
                    Listens: {song.songPlays} | Owner: {song.ownerEmail}
                </p>
                {auth.loggedIn? (auth.user?.email? (auth.user.email===song.ownerEmail? <Button variant="contained" onClick={() => editSong(index)}>Edit</Button> : <></>) : <></>) : <></>}
            </div>
            
        </Box>
        </>
    )
}
