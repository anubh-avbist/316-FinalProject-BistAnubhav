const Playlist = require('../models/playlist-model')
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
readPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        // Removed error if no playlists are found... maybe all playlists are just deleted!

        // PUT ALL THE LISTS INTO ID, NAME PAIRS
        let pairs = [];
        for (let key in playlists) {
            let list = playlists[key];
            let pair = {
                _id: list._id,
                name: list.name
            };
            pairs.push(pair);
        }
        return res.status(200).json({ success: true, idNamePairs: pairs })
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
    const body = req.body;
    const startString = body.start_string;
    
    await Playlist.find({ name: {$regex: `^${startString}`} }, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if(lists.length == 0){
            return res.status(400).json({ success: false, playlists: lists, message: "No list found!"})
        }

        return res.status(200).json({success: true, message: "Sucessfully found " + lists.length + " playlists!", playlists: lists});
        
    }).catch(err => {
        console.log("ERROR: " + err);
        return res.status(400).json({success: false, message: "Find_one error!"});
    });
}

module.exports = {
    createPlaylist,
    readAllPlaylists,
    readPlaylistPairs,
    readPlaylistById,
    renamePlaylist,
    deletePlaylist,
    getLists
}