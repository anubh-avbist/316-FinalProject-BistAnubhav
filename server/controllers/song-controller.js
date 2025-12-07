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

getSongs = async (req, res) => {
    const query = req.body;
    await Song.find(query, (err, songs) => {
        if(err) {
            return res.status(400).json({success: false, error: err});
        }
        return res.status(200).json({success: true, message: `Found ${songs.length} songs!`, songs: songs})
    }).catch(err => console.log(err))
}

updateSong = async (req, res) => { 
    const id = req.params.id;
    const song = await Song.findOne({ _id: id }, (err, song) => {
                    return song;
                }).catch(err => console.log(err))

    if(!song){
        console.log("NO SONG");
        return res.status(404).json({success: false, message: "Song not found!"});
    } 
    
    const { title, artist, year, ytID } = req.body;
    if(title){
        song.title = title;
    }
    if(artist){
        song.artist = artist;
    }
    if(year){
        song.year = year;
    }
    if(ytID){
        song.ytID = ytID;
    }
    song.save().then(() => {
        return res.status(200).json({success: false, message: "Song updated!", song: song});
    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Saving error!"});
    });
}

deleteSong = async (req, res ) => {
    
}

module.exports = {
    createSong,
    getSongById,
    getSongs,
    updateSong,
    deleteSong
}