const User = require('../database/models/user');
const validate = require('../validators')
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = {
  async login (req, res) {
    const { error } = validate.auth(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');
  
    const token = user.generateAuthToken();
  
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
    res.end();
  }
}