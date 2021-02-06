const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {

    const { name, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ name: name, passwordHash: passwordHash })

    newUser.save()
        .then(savedUser => res.json(savedUser))
}


exports.login = async (req, res) => {
    let { name, password } = req.body

    let foundUser = await User.find({ name: name })
    let passwordMatch = await bcrypt.compare(password, foundUser[0].passwordHash)

    console.log("passwordMatch is ", passwordMatch) // true or false.

    // if login successful, returns a token!
    if (passwordMatch) {
        let user = {
            _id: foundUser[0]._id,
            name: foundUser[0], name
        }

        let token = jwt.sign(user, "hi")
        res.json(token)  // You should also send the name of the user and the username.

    } else {

        res.status(401).json({ error: "user not found" })
    }
}


// The following token has been returned. Tomorrow try to post a note using the following header.
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFkYmNhZDM2OTU0MWQxMmEyMjZhODYiLCJuYW1lIjoidGVzdCIsImlhdCI6MTYxMjU2Mzg5NH0.Lx1d5PYfVkrutIdkGPDh7Q6fx_M3ex8ATFOOHBUwOgc"





exports.createNote = (req, res) => {


    const getTokenFrom = req => {
        let authorization = req.get('authorization')  // how to get the hader "Authorization"
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7)
        }
        return null
    }

    let token = getTokenFrom(req)

    let decryptedUser = jwt.verify(token, "hi")  // If it doesn't exist, or is malformatted, it throws an error here.
    console.log("decryptedUser is, ", decryptedUser)



    // we can even find the user from the db
    let idUser = decryptedUser._id
    console.log("idUser is, ", idUser)

    User.findById(idUser, (err, doc) => {
        console.log("doc is,", doc)
    })
    // 
    // 


    res.json({ token: token, decryptedUser: decryptedUser })
}