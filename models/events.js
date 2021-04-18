const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    name: String,
    mailID: String,
    event: String,
},{
    timestamps:true
})

var Events = mongoose.model('Event', EventsSchema);
module.exports = Events;