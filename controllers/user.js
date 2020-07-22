const bcrypt = require('bcrypt');
const _ = require('lodash');
const validate = require('../validators');
const User = require('../database/models/user');
const Group = require('../database/models/group');

module.exports = {
  async getUserList (req, res) {
    const users = await User
      .find()
      .populate('interest', '-__v')
      .populate('groups', '-__v -members -admin')
      .select('-__v');
  
    if(!users) return res.status(404).send('Users not found');
    res.send(users);
    res.end();
  },
  async getUser (req, res) {
    const user = await User
      .findById(req.params.id)
      .populate('interest', '-__v')
      .populate('groups', '-__v -members -admin')
      .select('-__v -password');
    
    if(!user) return res.status(404).send('Users not found');
    res.send(user);
    res.end();
  },
  async createUser (req, res) {
    const { error } = validate.user(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'city', 'country', 'interest', 'isAdmin','groups']));
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    
    groupIds = user.groups;
  
    try {
        user.save().then(() => {
        if(groupIds.length > 0) {
          groupIds.forEach( async (item) => {
            const group = await Group.findById(item);
            group.members.push(user._id);
            await group.save();
          });
        }
      });
    } catch(err) {
      return res.status(500).send('Failed to save user');
    }
  
    const token = user.generateAuthToken(); 
    res.header('x-auth-token', token).send(_.pick(user, ['id','name', 'email']));
    res.end()
  },
  async updateUser (req, res) {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User with given id was not found');

    user.name = req.body.name;
    user.password = req.body.password;
    user.city = req.body.city;
    user.country = req.body.country;
    user.isAdmin = req.body.isAdmin;
    user.photos = req.body.photos;
    user.interest = req.body.interest;
    user.groups = req.body.groups;

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);

    const groupIds = req.body.groups;
    
    user.save().then(() => {
      if(groupIds.length > 0) {
        groupIds.forEach( async (item) => {
          const group = await Group.findById(item);
          const index = group.members.indexOf(item);
          
          if(index === -1) {
            group.members.push(user._id);
          }

          await group.save();
        });
      } else if(groupIds.length === 0) {
        async function removeUserFromGroups() {
          const groups = await Group.find();
          const group = groups.find(item => item.members.indexOf(user._id) > -1);
          const index = group.members.indexOf(user._id);
          group.members.splice(index, index+1);
          await group.save().then(() => console.log(group)); 
        }
        removeUserFromGroups();
      }
    }).catch((err) => {
      return res.status(500).send('Failed to save user');
    });
    res.send(user);
    res.end();
  },
  async deleteUser (req, res) {
    let user = await User.findById({ _id: req.params.id });
    if(!user) return res.status(404).send('User with given id was not found');
  
    try {
      if(user.groups.length > 0) {
        user.groups.forEach( async (item) => {
          const group = await Group.findById(item);
          const index = group.members.indexOf(item);
                
          if(index > -1) {
            group.members.splice(index, index+1);
          }
  
          await group.save();
        });
      }
      await user.remove();
      res.send('User deleted');
      res.end();
    } catch(err ) {
      res.status(500).send('Failed to delete user');
    } 
  }
}