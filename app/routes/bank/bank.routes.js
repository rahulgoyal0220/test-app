module.exports = app => {
  const bank = require("../../controllers/bank/bank.controller");

  var router = require("express").Router();

  // Create a new bank
  router.post("/", bank.create);
  
  // Retrieve a single bank with id
  router.get("/:id", bank.findOne);

//Retrieve all bank for a user
router.get("/", bank.findAll);

  // Update a bank with id
  router.put("/:id", bank.update);

  // Delete a bank with id
  router.delete("/:id", bank.delete);

  app.use("/api/bank", router);
};
