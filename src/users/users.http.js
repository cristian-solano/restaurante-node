const usersControllers = require('../users/users.controllers')
const config = require('../config')


// todo: 
//? /users ADMIN
//? /users/:id ADMIN
//? /users/me CLIENT
//? delete /users/:id ADMIN
//? put/patch /users/me CLIENT USUARIO
//? put-patch /users/:id ADMIN 

// /auth/login
// /auth/singin
// /auth/reset-password
// /auth/reset-token
// /auth/verify-account


const getAllUser = async (req, res) => {
    // ? limit=5&start=5
    // ?offset=0
    // * limit=5
    // * page
    // * start

    const offset = req.query.offset
    const limit = req.query.offset

    const totalLenght = await usersControllers.getPaginationUser()
    //limit, offset, size, lenght
    const users = await usersControllers.getPaginationUser(offset, limit)
    res.status(200).json({
        _links: {
        "base": `${config.domainHost}/users`,
        "next": "/page?limit=5&start=5",
        "prev": ""
        },
        total: totalLenght.lenght,
        limit,
        size: users.lenght,
        results: users
    })
}



const getUserById = async(req, res) => {
    
    const [user, err] = await usersControllers.getUserById(req.user.id)
    res.status(200).json(user)

    if(err || !user){
        return res.status(401).json({
            message: 'Credencial Invalida'
        })
    }

}

module.exports = {
    getAllUser,
    getUserById
}