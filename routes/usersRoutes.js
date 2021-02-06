const User = require('../models/Users')

module.exports = function (app) {

    const userController = require('../controllers/usersController')

    app.post('/register', userController.createUser)

    app.post('/login', userController.login)

    app.post('/api/notes', userController.createNote)
}