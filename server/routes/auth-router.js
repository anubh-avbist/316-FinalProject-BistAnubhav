/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const AuthController = require('../controllers/auth-controller')
const router = express.Router()

module.exports = router