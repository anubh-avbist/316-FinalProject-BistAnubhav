/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

// FOR USE WITH PLAYLISTER NOW
router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.readPlaylistById)
router.get('/playlists', PlaylistController.readAllPlaylists)
router.get('/playlistpairs', PlaylistController.readPlaylistPairs)
// Things I Added:
router.post('/update/rename_list/:id', PlaylistController.renamePlaylist)
router.delete('/update/delete_list/:id', PlaylistController.deletePlaylist)
router.post('/update/new_song/:id', PlaylistController.addSong)
router.post('/update/create_song/:id', PlaylistController.createSong)
router.post('/update/move_song/:id', PlaylistController.moveSongs)
router.delete('/update/delete_song/:id/:index', PlaylistController.deleteSong)
router.post('/update/change_song/:id', PlaylistController.changeSong)
router.get('/query/get_lists', PlaylistController.getLists)
router.get('/query/get_songs', PlaylistController.getSongs)

module.exports = router