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
router.get('/songs', SongController.getSongs)

module.exports = router