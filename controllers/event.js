require('dotenv').config();
const axios = require('axios');
const _ = require('lodash');
const Event = require('../database/models/event');
const Category = require('../database/models/category');
const City = require('../database/models/city');
const validate = require('../validators');

module.exports = {
  async getEventList (req, res) {
    const events = await Event
      .find()
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');
    if(!events) return res.status(404).send('Events was not found');
  
    res.send(events);
    res.end();
  },
  async getEvent (req, res) {
    const events = await Event
      .findById(req.params.id)
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');
    if(!events) return res.status(404).send('Events with given id was not found');
  
    res.send(events);
    res.end();
  },
  async createEvent (req, res) {
    const { error } = validate.event(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let event = new Event(
      _.pick(req.body, 
        ['title', 
         'date', 
         'venue', 
         'city',
         'groupHost', 
         'host', 
         'photos', 
         'isOnline', 
         'details', 
         'attendees', 
         'category',
        'comments']));

    event.save().then(async () => {
      try {
        const category = await Category.findById(req.body.category);
        category.events.push(event);
        await category.save();
        res.send(event);
        res.end();
      } catch(err) {
        res.status(500).send("Failed to update events's category");
      }
    }).catch((err) => {
      console.log(err)
    });
  },
  async updateEvent (req, res) {
    const { error } = validate.event(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const event = await Event.findByIdAndUpdate(req.params.id, 
      _.pick(req.body, 
        ['title', 
        'date', 
        'venue', 
        'city',
        'groupHost', 
        'host', 
        'photos', 
        'isOnline', 
        'details', 
        'attendees', 
        'category',
        'comments']), { new: true });
    if(!event) return res.status(404).send('Event with given id was not found');
  
    res.send(event);
    res.end();
  },
  async deleteEvent (req, res) {
    const event = await Event.findByIdAndRemove(req.params.id);
    if(!event) return res.status(404).send('Event with given id was not found');
  
    res.send(event);
    res.end();
  },
  async getNearestEvent (req, res, next) {
    const cities = await City
    .find({
        location:
          { 
            $near :
            {
              $geometry: { type: "Point",  coordinates: [ req.params.longitude, req.params.latitude ] },
              $minDistance: 0,
              $maxDistance: 65000
            }
          }
      });

    if(cities.length === 0) {
      const events = await Event
      .find()
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');

      res.send(events);
      res.end();
      return;
    }

    const cityIds = cities.map(c => c._id );
    
    const events = await Event
      .find({ city: { $in: cityIds }})
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');

    res.send(events);
    res.end();
  },
  async searchEvent(req, res, next) {
    const cities = await City
    .find({
        location:
          { 
            $near :
            {
              $geometry: { type: "Point",  coordinates: [ req.params.longitude, req.params.latitude ] },
              $minDistance: 0,
              $maxDistance: 65000
            }
          }
      });
      console.log(cities);
    if(cities.length === 0) {
      const events = await Event
      .find()
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');

      res.send(events);
      res.end();
      return;
    }

    const cityIds = cities.map(c => c._id );
    
    const events = await Event
      .find({
        $or: [
          { title: new RegExp(req.params.name, 'i') },
          { city: { $in: cityIds }}
        ]
      })
      .populate('groupHost', '-__v')
      .populate('host', '-__v')
      .populate('city', '-__v')
      .populate('attendees', '-__v')
      .populate('category', '-__v')
      .populate('comments', '-__v')
      .select('-__v');

    res.send(events);
    res.end();
  }
}