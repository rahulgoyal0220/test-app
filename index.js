const Joi = require('joi');
const user = require('./routes/user');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/user', user);

app.get("/", (req, res) => {
    res.send({message : "welcome"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));