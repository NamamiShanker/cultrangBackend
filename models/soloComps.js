const mongoose = require('mongoose');

const soloCompSchema = new mongoose.Schema({
    name: String,
    mailID: String,
    comp: String,
})

var soloComps = mongoose.model('SoloComp', soloCompSchema);
module.exports = soloComps;