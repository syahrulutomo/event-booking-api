const helmet = require('helmet');
const categories = require('./routes/categories');
const users = require('./routes/users');
const groups = require('./routes/groups');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/event-booking', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to databasse'))
  .catch(err => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/groups/', groups);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));