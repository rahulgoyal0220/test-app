const db = require("../../models");
const Bank = db.bank;
const Op = db.Sequelize.Op;

// Create and Save a new Bank
exports.create = (req, res) => {
  // Validate request
  if (!req.body.bankName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a bank
  const bank = {
    bankName: req.body.bankName,
    bankType: req.body.bankType,
    userId: req.body.userId
  };

  // Save bank in the database
  Bank.create(bank)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the bank."
      });
    });
};

//Find bank by user id:
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId || null;

  Bank.findAll({ 
    where: {
      userId:{
        [Op.eq]: condition
      }
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving banks."
      });
    });
};

// Find a single bank with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bank.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving bank with id=" + id
      });
    });
};

// Update a bank by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Bank.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "bank was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update bank with id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating bank with id=" + id
      });
    });
};

// Delete a bank with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Bank.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "bank was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete bank with id=${id}. Maybe Bank was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bank with id=" + id
      });
    });
};
