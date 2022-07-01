const router = require('express').Router();
const customerHttpHandler = require('./customers.http');

router.route('/')
    .get(customerHttpHandler.getAllCustomers)
router.route('/:id')
    .get(customerHttpHandler.getCustomersById)
    .delete(customerHttpHandler.deleteCustomers)
    .put(customerHttpHandler.editCustomer)    
module.exports = {
    router
}