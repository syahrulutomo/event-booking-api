const City = require('../database/models/city');
const validate = require('../validators');

module.exports = {
  async getCityList (req, res, next) {
    try {
      const cities = await City.find().sort({ name: 1 });
      res.send(cities);
      res.end();
    } catch(err) {
      return res.status(404).send('Categories not found');
    }
  },
  async getCity (req, res, next) {
    try {
      const city = await City.findById(req.params.id).sort({ name: 1 });
      res.send(city);
      res.end();
    } catch(err) {
      return res.status(404).send('City not found');
    }
  },
  async createCity (req, res, next) {
    const { error } = validate.city(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let city = new City({
      name: req.body.name,
      country: req.body.country,
      countryAbbr: req.body.countryAbbr,
      lat: req.body.lat,
      long: req.body.long
    });
    
    try {
      await city.save();
      res.send(city);
      res.end();
    } catch(err) {
      next(err);
    }
  },
  async updateCity(req, res, next) {
    const { error } = validate.city(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    try {
      const city = await City.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        country: req.body.country,
        countryAbbr: req.body.countryAbbr,
        lat: req.body.lat,
        long: req.body.long
      }, { new: true });
      if(!city) return res.status(404).send('City with given id was not found');
    
      res.send(city);
      res.end();
    }
    catch(err) {
      next(err.message);
      return res.status(404).send('City with given id was not found');
    }
  },
  async deleteCity (req, res, next) {
    try {
      const city = await City.findByIdAndRemove({ _id: req.params.id });
      if(!city) return res.status(404).send('City with given id was not found');
    
      res.send(city);
      res.end();
    }
    catch(err) {
      next(err.message);
      return res.status(404).send('City with given id was not found');
    }
  }
}