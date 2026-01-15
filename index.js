const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected', process.env.MONGO_URI))
  .catch(err => console.log(err));

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
