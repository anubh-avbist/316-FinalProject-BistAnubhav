const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true},
        songs: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }], required: true },
        listeners: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('playlist', playlistSchema)
