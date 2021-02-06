const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// 1) Testing JWT
let token = jwt.sign({ nicola: 123 }, "hi")
console.log(token)

let decodedToken = jwt.verify(token, "hi")
console.log("decodedToken is ", decodedToken)  // returns object with "iat" ---> issued at.

// 2) Testing bcrypt
// const crypting = async (toCript, salt) => {
//     const encrypted = await bcrypt.hash(toCript, 10)
//     return encrypted
// }


// crypting("hi", 10).then(encrypted => console.log("the encrypted word is ", encrypted))

// console.log("is it comparable? ")
// bcrypt.compare("hi", "$2b$10$ZoJBeGD.UtJ5wBpf7SLOnu/dm0MuEzqFNKjWhHOlBz3UDXdIl1IqW").then(console.log)