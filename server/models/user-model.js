const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        playlists: [{type: ObjectId, ref: 'playlist'}],
        avatar: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('user', userSchema)
