const Group = require('../database/models/group');
const validate = require('../validators');
const _ = require('lodash');

module.exports = {
  async getGroupList (req, res) {
    const groups = await Group
      .find()
      .populate('admin', '-photos -__v -interest -password -groups -notifications -joined_at')
      .populate('members', '-photos -__v -interest -password -groups -notifications -joined_at')
      .select('-__v');
  
    if(!groups) return res.status(404).send('Groups was not found');
  
    res.send(groups);
    res.end();
  },
  async getGroup (req, res) {
    const group = await Group.findById(req.params.id);
    if(!group) return res.status(404).send('Group was not found');
  
    res.send(group);
    res.end();
  },
  async createGroup (req, res) {
    const { error } = validate.group(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let group = new Group({
      name: req.body.name,
      city: req.body.city,
      admin: req.body.admin,
      photos: req.body.photos,
      members: req.body.members
    });
    
    try {
      await group.save();
    } 
    catch(err) {
      return res.status(400).send('Bad request');
    }
    res.send(group);
    res.end();
  },
  async updateGroup (req, res) {
    const { error } = validate.group(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const group = await Group.findByIdAndUpdate(
      req.params.id, {
        name: req.body.name,
        admin: req.body.admin,
        city: req.body.city,
        photos: req.body.photos,
        members: req.body.members
      }, {new: true});
    if(!group) return res.status(404).send('Group was not found');
  
    res.send(group);
    res.end(); 
  },
  async deleteGroup (req, res) {
    const group = await Group.findByIdAndRemove(req.params.id);
    if(!group) return res.status(404).send('Group was not found');
  
    res.send(group);
    res.end(); 
  }
}