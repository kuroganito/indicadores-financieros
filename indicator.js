var mongoose = require('mongoose');
mongoose.connect('mongodb://root:indicadores@ds025603.mlab.com:25603/heroku_krf90n0c');

var Indicator = mongoose.model('Indicator', {
    name: String,
    date: Date,
    value:Number
});

module.exports = Indicator;
