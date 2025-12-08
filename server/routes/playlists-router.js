/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()


router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.readPlaylistById)
router.delete('/playlist/:id', PlaylistController.deletePlaylist)

router.get('/get_lists', PlaylistController.getLists)

router.get('/playlists', PlaylistController.readAllPlaylists)
router.post('/rename_list/:id', PlaylistController.renamePlaylist)
router.put('/playlist/removeSong', PlaylistController.removeSongFromPlaylist)

module.exports = router