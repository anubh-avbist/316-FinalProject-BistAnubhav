const Playlist = require('../models/playlist-model')
const User = require('../models/user-model')
const Song = require('../models/song-model')

/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    const email = playlist.ownerEmail;
    const user = User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res.status(400).json({ success: false, error: "User not found!" })
        }

        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                console.log("Added playlist to user's list of playlists");
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Playlist Not Added to User!',
                })
            })
    });



    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
readPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
readAllPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}


// Things I Made:
renamePlaylist = async (req, res) => {

    const body = req.body;
    let newName = body.newName;

    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if(list == null){
            return res.status(400).json({ success: false, message: "No list found!"})
        }

        list.name = newName;
        list.save().then(()=>{
            return res.status(200).json({success: true, playlist: list, message: "Song succesfully renamed"});

        }).catch(err => {
            console.log("ERROR: " + err);
            return res.status(400).json({success: false, message: "Saving error!"});
        });
        
    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Find_one error!"});
    });

}  

deletePlaylist = async (req, res) => {

    await Playlist.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({success: true, message: "List successfully deleted.", result: JSON.stringify(result)});

    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Find_one error!"});
    });
}  

getLists = async (req, res) => {
    const rawQuery = req.body;
    const { name, username, songTitle, songArtist, songYear } = rawQuery;
    let query = {};
    
    if (name) {
        query.name = name;
    }


    if (username) {
        const users = await User.find({ username: username }).exec();
        if (users.length === 0) {
            return res.status(400).json({success: false, message: "No user found with the given username!"});
        }
        query.ownerEmail = { $in: users.map(user => user.email) };
    }

    if (songTitle || songArtist || songYear) {
        query.songs = { $elemMatch: {} };
        if (songTitle) {
            const listsWithSongs = await Song.find({ title: songTitle }, '_id').exec();
            if (listsWithSongs.length === 0) {
                return res.status(400).json({success: false, message: "No playlists found with the given song title!"});
            }
            query.songs.$elemMatch.$in = listsWithSongs.map(list => list._id);
        }
        if (songArtist) {
            const listsWithSongs = await Song.find({ artist: songArtist }, '_id').exec();
            if (listsWithSongs.length === 0) {
                return res.status(400).json({success: false, message: "No playlists found with the given song artist!"});
            }
            query.songs.$elemMatch.$in = listsWithSongs.map(list => list._id);
        }
        if (songYear) {
            const listsWithSongs = await Song.find({ year: songYear }, '_id').exec();
            if (listsWithSongs.length === 0) {
                return res.status(400).json({success: false, message: "No playlists found with the given song year!"});
            }
            query.songs.$elemMatch.$in = listsWithSongs.map(list => list._id);
        }
    }
    

    await Playlist.find(query, (err, lists) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({success: true, message: "Sucessfully found " + lists.length + " playlists!", playlists: lists});
        
    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Find_one error!"});
    });
}


// I have to remove by index and not ID since there could be duplicates in the list
removeSongFromPlaylist = async (req, res) => {
    const { index, playlistId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId }, (err, playlist) => {
        return playlist;
    }).catch(err => console.log(err));

    if(!playlist){
        return res.status(404).json({success: false, message: "Playlist not found!"});
    }

    playlist.songs.splice(index, 1);
    playlist.save().then(() => {
        return res.status(200).json({success: true, message: "Song removed from playlist!", playlist: playlist});
    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Saving error!"});
    });
}

module.exports = {
    createPlaylist,
    readAllPlaylists,
    readPlaylistById,
    renamePlaylist,
    deletePlaylist,
    getLists,
    removeSongFromPlaylist
}