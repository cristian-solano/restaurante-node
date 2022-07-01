//Cualquier usuario
const crypto = require('../tools/crypt')
const uuid = require('uuid');
const initModels = require('../database/models/init-models');
const users = require('../database/models/init-models').initModels().users;
const sequelize = require('sequelize')
const models = initModels(sequelize)

const registerUser = (data) => {
    // todo: La contraseña tiene que estar encriptada con bcrypt
    const hashedPassword = crypto.hashPassword(data.password);
    const userId = uuid.v4();
    const newUser = users.create({
        id: userId,
        ...data,
        password: hashedPassword,
        role_id: 1
    })

    return {
        message: `Usuario creado con el id: ${userId}`,
        user: newUser,
    };
}

//Solo administradores
const getAllUsers = async() => { 
    const user = await models.users.findAll({
        attributes : {
            exclude: ["password"]
        }
    })
    return user
}

//Solo administradores
const getUserById = async(id) => {
    const user = await users.findOne({
        where: {id},
        include: [
            {
            model: models.users,
            as: 'user',
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    
                }
            ]
            }
            
        ]   

    })
    return user
}

//clientes y administradores
const deleteUser = async(id) => {
    try {
        const user = await users.destroy({
            where: {
                id
            }
        })
        return {
            message: `Usuario con id: ${id} eliminado satisfactoriamente.`,
            user
        }
    } catch (error) {
        return error
    }
    
    
}

// cualquier rol
const editUser = async(id, data) => {
    const user = await   users.update(data, { 
        where: {
            id
        }
    })
    return {
        message: `Usuario con el id: ${id} editado satisfactoriamente.`,
        user: user
    }
}

//todo: 
// ? Crear una funcion que genere un token alfanumerico aleatorio de 8 caracteres
// ? Generar un nuevo token y agregar un nuevo registro a la tabla de verify_tokens, con el userId para enlazar el token

const getPaginationUser = async(offset, limit) => {
// limit : 5
    if(offset && limit){
        const data = await users.findAll({
            limit,
            offset
        })
        return data
    }else {
        const data = await users.findAll()
        return data
    }

    
}

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    deleteUser,
    editUser,
    getPaginationUser
}  

