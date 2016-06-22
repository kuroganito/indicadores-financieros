var express = require('express');
var app = express();
var firtsLoad = require('./firtsLoad')
var Indicator = require('./indicator')
var schedule = require('node-schedule');

app.use(express.static('public'));
app.get('/api', function(req, res) {
    if (req.query.type != null && req.query.year != null && req.query.month != null && req.query.day != null && req.query.type > 0 && req.query.type < 16) {
        var indicatorName = firtsLoad.idicators[req.query.type - 1].name;
        var indicatorDate = new Date(req.query.year, req.query.month - 1, req.query.day)
        Indicator.find({
            name: indicatorName,
            date: indicatorDate
        }).then(function(data) {
            res.json(data)
        })
    } else {
        res.send("Parametros incorrectos");
    }
});

app.listen((process.env.PORT || 3000), function() {
    firtsLoad.checkIfEmpty();
    console.log('Corriendo en el puerto: ' + (process.env.PORT || 3000));
});
