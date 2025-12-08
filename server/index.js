/*
    This is our back-end server, which employs some middleware
    to make sure data is received in the proper format (i.e. JSON)
    and hooks up all of our pieces.
    
    @author McKilla Gorilla
*/

// THESE ARE NODE APIs WE WISH TO USE
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({ preflightContinue: true, origin: 'http://localhost:5173', credentials: true })); // ADD THE CLIENT URL TO OUR CORS POLICY
app.use(express.json())
app.use(cookieParser());

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const playlistRouter = require('./routes/playlists-router')
const songRouter = require('./routes/songs-router')
const authRouter = require('./routes/auth-router')
app.use('/api', playlistRouter)
app.use('/api', songRouter)
app.use('/auth', authRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
const apiPort = 4000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))