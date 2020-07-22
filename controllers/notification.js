const _ = require('lodash');
const Notification = require('../database/models/notification');
const validate = require('../validators');

module.exports = {
  async getNotificationList (req, res) {
    const notification = await Notification
      .find()
      .populate('subject')
      .select('-__v');
    if(!notification) return res.status(404).send('Notifications not found');
  
    res.send(notifications);
    res.end();
  },
  async getNotification (req, res) {
    const notification = await Notification
      .findById(req.params.id)
      .populate('subject')
      .select('-__v');
    if(!notification) return res.status(404).send('Notification not found');
  
    res.send(notification);
    res.end();
  },
  async createNotification (req, res) {
    const { error } = validateNotification(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const notification = new Notification(
      _.pick(req.body, ['subject', 'content'])
    );
  
    try {
      await notification.save()
      res.send(notification);
      res.end()
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  async updateNotification (req, res) {
    const { error } = validateNotification(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const notification = await Notification.findByIdAndUpdate(req.params.id, 
      _.pick(req.body, ['subject', 'content']), { new: true });
      if(!notification) return res.status(404).send('Notification not found');
    
    res.send(notification);
    res.end();
  },
  async deleteNotification (req, res) {
    const notification = await Notification.findByIdAndRemove(req.params.id);
    if(!notification) return res.status(404).send('Notifications not found');
    
    res.send(notification);
    res.end();
  }
}
