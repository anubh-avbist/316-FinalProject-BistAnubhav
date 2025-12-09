import { useContext, useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AuthContext from '../auth';
import { getSongs, saveSong } from '../requests/SongRequests';

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 345,
    
    backgroundSize: "contain",
    backgroundImage: `url(https://i.insider.com/602ee9ced3ad27001837f2ac?})`,
    border: '3px solid #000',
    padding: '20px',
    boxShadow: 24,
};

export default function MUIEditSongModal({ closeModal, song }: { closeModal: () => void, song?: { title: string, artist: string, year: number, ytId: string } }) {
    const { auth } = useContext(AuthContext);


    async function handleConfirmEditSong(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedSong = {
            title: formData.get('edit-song-title') as string,
            artist: formData.get('edit-song-artist') as string,
            year: formData.get('edit-song-year') ? Number(formData.get('edit-song-year')) : undefined
        };

        const oldQuery = {
            title: song?.title,
            artist: song?.artist,
            year: song?.year
        }

       await getSongs(oldQuery).then(async (response) => {
            let songsList = await response.json();

            let songs = songsList.songs;
            const song = songs[0];
            saveSong(song, updatedSong);
        }).catch((error) => {
            console.log(error);
        });

        closeModal();
    }

    function handleCancelEditSong(): void {
        closeModal();
    }

    return (
        <Box sx={style1} noValidate component="form" onSubmit={handleConfirmEditSong}>
            <div id="edit-song-modal" data-animation="slideInOutLeft">
            <Typography 
                sx={{fontWeight: 'bold'}} 
                id="edit-song-modal-title" variant="h4" component="h2">
                Edit Song
            </Typography>
            <Divider sx={{borderBottomWidth: 5, p: '5px', transform: 'translate(-5.5%, 0%)', width:377}}/>
            <Typography 
                sx={{mt: "10px", color: "#702963", fontWeight:"bold", fontSize:"30px"}} 
                id="modal-modal-title" variant="h6" component="h2">
                Title: <input name="edit-song-title" className='modal-textfield' type="text" defaultValue={song?.title} />
            </Typography>
            
            <Typography 
                sx={{mt: "10px", color: "#702963", fontWeight:"bold", fontSize:"30px"}} 
                id="modal-modal-artist" variant="h6" component="h2">
                Artist: <input name="edit-song-artist" className='modal-textfield' type="text" defaultValue={song?.artist} />
            </Typography>
            
            <Typography 
                sx={{mt: "10px", color: "#702963", fontWeight:"bold", fontSize:"30px"}} 
                id="modal-modal-year" variant="h6" component="h2">
                Year: <input name="edit-song-year" className='modal-textfield' type="text" defaultValue={song?.year} />
            </Typography>
            
            <Typography 
                sx={{mt: "10px", color: "#702963", fontWeight:"bold", fontSize:"30px"}} 
                id="modal-modal-ytid" variant="h6" component="h2">
                YTID: <input name="edit-song-ytid" className='modal-textfield' type="text" defaultValue={song?.ytId} />
            </Typography>
            
            <Button 
                type = "submit" sx={{color: "#8932CC", backgroundColor: "#CBC3E3", fontSize: 13, fontWeight: 'bold', border: 2, p:"5px", mt:"20px"}} variant="outlined" 
                id="edit-song-confirm-button">Confirm</Button>
            <Button 
                sx={{opacity: 0.80, color: "#8932CC", backgroundColor: "#CBC3E3", fontSize: 13, fontWeight: 'bold', border: 2, p:"5px", mt:"20px", ml:"197px"}} variant="outlined" 
                id="edit-song-confirm-button" onClick={handleCancelEditSong}>Cancel</Button>
            </div>
        </Box>
    );
}