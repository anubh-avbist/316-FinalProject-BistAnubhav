const jwt = require("jsonwebtoken")

function authManager() {
    verify = async (req, res, next) => {
        console.log("req: " + JSON.stringify(req.cookies));
        // console.log("next: " + next);
        console.log("Who called verify??");
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = await jwt.verify(token, process.env.JWT_SECRET)
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken.userId;
        } catch (err) {
            return null;
        }
    }

    signToken = (userId) => {
        console.log("SIGNING TOKEN: " + userId);
        return jwt.sign({
            userId: userId
        }, process.env.JWT_SECRET);
    }

    return this;
}

const auth = authManager();
module.exports = auth;