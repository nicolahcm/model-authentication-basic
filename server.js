const express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    mongoose = require('mongoose')



mongoose.connect('mongodb://localhost/testingAuthentication', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection with mongodb estabilished!"))
    .catch(err => console.log('error connecting with mongodb!'))



app.use(express.json())

const User = require('./models/Users')
const usersRoutes = require('./routes/usersRoutes')
usersRoutes(app)




PORT = 3000

app.listen(PORT, () => console.log(`connected to PORT ${PORT}`))
