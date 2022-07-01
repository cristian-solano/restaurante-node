//Cualquier usuario

const initModels = require('../database/models/init-models');
const sequelize = require('sequelize')
const models = initModels(sequelize)


//Solo administradores
const getAllCustomers = async() => { 
    const customer = await models.customer_addresses.findAll({
        attributes : {
            exclude: ["longitude", "latitude", "other_details"]
        }
    })
    return customer
}

//Solo administradores
const getCustomersById = async(id) => {
    const customer = await models.customer_addresses.findByPk({
        where: {id} 

    })
    return customer
}

//clientes y administradores
const deleteCustomers = async(id) => {
    try {
        const customer = await models.customer_addresses.destroy({
            where: {
                id
            }
        })
        return {
            message: `Cliente con id: ${id} eliminado satisfactoriamente.`,
            customer
        }
    } catch (error) {
        return error
    }
    
    
}

// cualquier rol
const editCustomers = async(id, data) => {
    const customer = await  models.customer_addresses.update(data, { 
        where: {
            id
        }
    })
    return {
        message: `Cliente con el id: ${id} editado satisfactoriamente.`,
        user: customer
    }
}
module.exports = {
    getAllCustomers,
    getCustomersById,
    deleteCustomers,
    editCustomers
} 