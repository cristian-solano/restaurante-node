const customerControllers = require('./customers.controllers')



const getAllCustomers = async(req, res) => {
  const customers = await customerControllers.getAllCustomers.findAll()
    res.status(200).json(customers)

    console.log(customers)
  };

  
const   getCustomersById = async(req, res) => {
    const customers = await customerControllers.getCustomersById.findByPk(req.params.id)
      .then((data) => {
        res.status(200).send(customers.data);
      })
      .catch((err) => res.status(204).send(err));
  };
  
const deleteCustomers = async(req, res) => {
    const customer = await customerControllers.deleteCustomers.destroy({
      where: { id: req.params.id },
    })
      .then((data) =>
        res.status(204).json({
          message: "Cliente eliminado.",
          data
        })
      )
      .catch((err) =>
        res.status(400).send({
          error: "Error detectado",
        })
      );
  };
  
    const editCustomer = async (req, res) => {
      const customer = await customerControllers.editCustomers.update(req.body, { 
        where: { 
          id: req.params.id 
        }})
       
        res.status(200).send({
        message: "Editado",
        customer
        });

        res.status(400).send({
        message: `No puede ser actualizado el usuario con el id: ${req.params.id}`,
        });
        res.status(500).send({ message: err.message });
        
  };

module.exports = {
  getAllCustomers,
  getCustomersById,
  deleteCustomers,
  editCustomer
}