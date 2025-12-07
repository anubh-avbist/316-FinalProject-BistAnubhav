const Song = require('../models/song-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/

createSong = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const song = new Song(body);
    console.log("song: " + JSON.stringify(body));
    if (!song) {
        return res.status(400).json({ success: false, error: err })
    }

    song
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                song: song,
                message: 'Song Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Song Not Created!',
            })
        })

}

getSongById = async (req, res) => {
    await Song.findOne({ _id: req.params.id }, (err, song) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, song: song })
    }).catch(err => console.log(err))
}

getSongs = async (req, res ) => {}

updateSong = async (req, res ) => {}

deleteSong = async (req, res ) => {}

module.exports = {
    createSong,
    getSongById,
    getSongs,
    updateSong,
    deleteSong
}