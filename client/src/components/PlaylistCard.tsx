import { Box } from "@mui/material";


export default function PlaylistCard({ index, list }:{ 
    index: number, 
    list: { 
        name: string,
        ownerEmail: string,
        songs: [{ type: string}],
        uniqueListeners: [{ type: string}]
    }}){

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
            }}
            key={index}
            id={'song-' + index + '-card'}
        >
            {index + 1}.
            
            <div>
                {list.name} by {list.ownerEmail} | Songs: {list.songs.length} | Unique Listeners: {list.uniqueListeners.length}
            </div>
            
        </Box>
        </>
    )
}
