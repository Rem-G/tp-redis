var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DataSchema = new Schema({
    data : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Data', DataSchema);
