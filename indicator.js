var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_UR);

var Indicator = mongoose.model('Indicator', {
    name: String,
    date: Date,
    value:Number
});

module.exports = Indicator;
