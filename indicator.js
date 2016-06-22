var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Indicator = mongoose.model('Indicator', {
    name: String,
    date: Date,
    value:Number
});

module.exports = Indicator;
