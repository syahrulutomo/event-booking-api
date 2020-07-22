const mongoose = require('mongoose');
const groupSchema = require('../schemas/group');

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;