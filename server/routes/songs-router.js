/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const SongController = require('../controllers/song-controller')
const router = express.Router()

router.post('/song', SongController.createSong)
router.get('/song/:id', SongController.getSongById)
router.post('/songs', SongController.getSongs)
router.put('/song/:id', SongController.updateSong)
router.delete('/song/:id', SongController.deleteSong)
router.post('/song/add_to_playlist', SongController.addSongToPlaylist)

module.exports = router