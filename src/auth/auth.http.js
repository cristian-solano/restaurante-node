//todo: 
// ? Crear una función que tome como argumento el token 
// ? y genere una url como la siguiente:
// ! /auth/verify_account?token=fsdfsegwesda&user_id=2


const authControllers = require('./auth.controller')
const toPromise = require('../tools/toPromise').toPromise;
const jwt = require('jsonwebtoken')
const config = require('../config')
const loginScheme = require('../tools/verify').loginSchema
const userControllers = require('../users/users.controllers')

const loginUser = async(req, res) => {
    const data = loginScheme.validate(req.body)
    if(data.error) {
        return res.status(400).json({message: data.error.details[0].message})
    } else if (!req.body.email || !req.body.password){
        return res.status(400).json({message: data.error.details[0].message})
    } 
    const [response, err] = await toPromise(authControllers.checkUsersCredential(data.value.email, data.value.password))

    if(err || !response) {
        return res.status(401).json({message: 'Invalid Credential'})
    }

    const [user, error] = await toPromise(userControllers.getUserByEmail(req.body.email))
    if(error || !user){
        return res.status(401).json({message: 'Invalid Credential'})

    }


    const token = jwt.sign({
        id: user.uuid, 
        email: req.body.email,
        role: req.body.role_id

    }, config.jwtSecret)
    res.status(200).json({token: token})
}


const generateUrl = (token, userId) => {
    return `/auth/verify_account?token=${token}&user_id=${userId}`
}

const generateVerifyToken = (req, res) => {
    //?esta ruta debe estar dentro de /me/verify-account
    if(!req.user.id){                  
        res.status(400).json({
            message: 'Error'
        })
    }
    const id = req.user.id
    const token = createToken(id)
    res.status(200).json({
        url : generateUrl(token, id),
        message: 'Confirm your account in the next url'
    })
}


const verifyAccount = async(req, res) => {
//* /auth/verify_account?token=fsdfsegwesda&user_id=2
    if(!req.query){
        res.status(400).json({
            message: 'Missing Data'
        })
    }else if(!req.query.token || req.query.user_id){
        res.status(400).json({
            message: 'Missing Data'
        })
    }else {
        //? verificar mi cuenta de usuario
        //todo crear ambos controladores para modificar la tabla de usuarios a verificado:true
        //todo y la tabla de verify_tokens a used: true
        //? Esta ruta no esta protegida, todo es a base del req.query
        //todo crear las rutas necesarias para verificar la cuenta 

        const verifyAccount = await toPromise(authControllers.verifyAccount(req.query.user_id))
        const verifyUser =  await   toPromise(authControllers.verifyAccount(req.query.user_id))
        if(verifyAccount && verifyUser){
            res.status(200).json({
                message: 'All good'
            })
        }
    }
}

module.exports = {
    generateUrl,
    generateVerifyToken,
    verifyAccount, 
    loginUser
}



