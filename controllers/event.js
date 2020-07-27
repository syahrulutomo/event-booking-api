require('dotenv').config();
const axios = require('axios');
const _ = require('lodash');
const Event = require('../database/models/event');
const Category = require('../database/models/category');
const City = require('../database/models/city');
const validate = require('../validators');
const Fawn = require('fawn'); 

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
  async getNearestEvent (req, res) {
    const cityOrigin = await City.find({ name: req.params.origin });
    
    const cities = await City.find();
    const citiesMapped = cities.map(c => { return {lat: c.lat, long: c.long} });
    let str = '';

    for(let i = 0; i < citiesMapped.length; i++) {
      str = str + citiesMapped[i].lat + ',' + citiesMapped[i].long + '|';
    }
    
    const distanceText = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${req.params.origin}&destinations=${str}&mode=driving&language=en-EN&key=${process.env.DISTANCE_MATRIX_API_KEY}`; 
    
    const distances = await axios.get(distanceText ,{ mode: 'no-cors' });
    if(!distances.data) return res.status(400).send('Distance not found');

    let filteredResult = distances.data.rows[0].elements.filter(d => d.distance.value < 65000);
    filteredResult = filteredResult.map(d => {
      const index = distances.data.rows[0].elements.indexOf(d);
      return cities[index];
    })
    
    if(filteredResult.length > 0) {
      const mapped = filteredResult.map(f => { return {city: f._id} } );
      
      const events = await Event
        .find()
        .or(mapped)
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
    
    res.send([]);
    res.end();
  }
}