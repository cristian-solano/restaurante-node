const { generateToken } = require("../tools/generateToken")
const verify_tokens = require('../database/models/init-models').initModels().verify_tokens;
const userControllers = require('../users/users.controllers')
const verifyTokens = require('../database/models/init-models').initModels().verify_tokens;
const { toPromise } = require('../tools/toPromise');




const checkUsersCredential = async (id, password) => {
    const [user, err ] = await toPromise(userControllers.getUserById(id));
    console.log(user.dataValues)
    if(!err && user.dataValues) {
       return  crypto.comparePassword(password, user.password)
    }else {
        return null
    }

}

const createToken = async(userId) => {
    const newToken = await verify_tokens.create({
        token : generateToken(),
        user_id: userId,
        used: false
    })
    return newToken
}

const verifyUser = async(id) => {
    const userVerify = await userControllers.update({verified: true},{
        where: {
            id
        }
    })
    return {
        message: 'User verified',
        userVerify
    }
}

const verifyAccount = async(id) => {
    const accountVerify = await verifyTokens.update({used: true}, {
        where : {
            id
        }
    })
}

module.exports = {
    createToken,
    verifyAccount,
    verifyUser, 
    checkUsersCredential
}