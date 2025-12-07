const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                email: existingUser.email              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    console.log("REGISTERING USER IN BACKEND");
    try {
        const { username, email, password, passwordVerify, avatar } = req.body;
        if (!username || !email || !password || !passwordVerify || !avatar) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);
        const playlists = [];

        const newUser = new User({username, email, passwordHash, playlists, avatar});
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        await res.status(200).json({
            success: true,
            user: {
                username: savedUser.username,
                email: savedUser.email              
            }
        })

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

editAccount = async (req, res) => {
    console.log("UPDATING USER IN BACKEND");
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }, (err, user) => {
            return user;
        }).catch(err => console.log(err));
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Account from ID not found!"
                })
        }

        const { username, email, password, passwordVerify, avatar } = req.body;
        if (!username || !email || !password || !passwordVerify || !avatar) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }

        if(email != user.email){
            const existingUser = await User.findOne({ email: email });
            console.log("existingUser: " + existingUser);
            if (existingUser) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        errorMessage: "An account with this email address already exists."
                    })
            }
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);       

        user.username = username;
        user.email = email;
        user.passwordHash = passwordHash;
        user.avatar = avatar;

        await user.save();
        console.log("user updated: " + user._id);
        await res.status(200).json({
            success: true,
            user: {
                username: user.username,
                email: user.email              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    editAccount
}