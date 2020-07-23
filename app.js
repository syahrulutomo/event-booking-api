require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const auth = require('./routes/auth');
const categories = require('./routes/categories');
const users = require('./routes/users');
const groups = require('./routes/groups');
const events = require('./routes/events');
const comments = require('./routes/comments');
const notifications = require('./routes/notifications');
const cities = require('./routes/cities');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/events', events);
app.use('/api/comments', comments);
app.use('/api/notifications', notifications);
app.use('/api/cities', cities);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err.message));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));