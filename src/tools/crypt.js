//todo: funcion para exncriptar contraseña
//todo: funcion para comparar contrasenas para hacer login

const bcrypt = require('bcrypt')

const hashPassword = (textPlainPassword) => {
    return bcrypt.hashSync(textPlainPassword, 10)

}

const comparePassword = (plainPassword, hashPassword, done) => {
    return bcrypt.compare(plainPassword, hashPassword, done)
    
}



module.exports = {
    hashPassword,
    comparePassword
}