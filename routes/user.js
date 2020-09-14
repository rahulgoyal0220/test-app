const express = require('express');
const Joi = require('joi');
const router = express.Router();

const users = [
  { id: 1, name: 'Rahul', age : 32 },  
  { id: 2, name: 'Goyal',age : 30 },  
  { id: 3, name: 'ASHIH', age : 31 },  
];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

router.put('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  user.name = req.body.name; 
  res.send(user);
});

router.delete('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});

router.get('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.send(user);
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age : Joi.number()
  });

  return schema.validate(user);
}

module.exports = router;