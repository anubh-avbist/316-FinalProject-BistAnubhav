import { Box, Button } from "@mui/material";

export default function SongCard({ index, song }: { index: number, song: { title: string, artist: string, year: number, songPlays: number, ytId: string, ownerEmail: string } }) {
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
                padding: '5px',
                backgroundColor: 'beige',
            }}
            key={index}
            id={'song-' + index + '-card'}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.ytId}>
                {song.title} ({song.year}) by {song.artist}
            </a>
            
        </Box>
        </>
    )
}
