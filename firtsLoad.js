var Indicator = require('./indicator')
var htmlToJson = require('html-to-json');
var search = require('./searchIndicator');


var listIndicator = [{
    name: "UDIS",
    n: 159
}, {
    name: "DOLAR",
    n: 158
}, {
    name: "CCP",
    n: 160
}, {
    name: "CCP-UDIS",
    n: 161
}, {
    name: "CPP",
    n: 162
}, {
    name: "CCP-DOLARES",
    n: 163
}, {
    name: "TIIE 28 DIAS",
    n: 165
}, {
    name: "TIIE 91 DIAS",
    n: 166
}, {
    name: "TIIC DEPOSITOS 60 DIAS",
    n: 167
}, {
    name: "TIIC DEPOSITOS 90 DIAS",
    n: 168
}, {
    name: "TIIC DEPOSITOS 180 DIAS",
    n: 169
}, {
    name: "TIIC PAGARES 28 DIAS",
    n: 170
}, {
    name: "TIIC PAGARES 91 DIAS",
    n: 171
}, {
    name: "TIIC PAGARES 182 DIAS",
    n: 172
}, {
    name: "TIIE 182 DIAS",
    n: 174
}]

var Query = {
    idicators: listIndicator,
    checkIfEmpty: function() {
        Indicator.find({}).then(function(data) {
            if (data.length == 0) {
                Query.queryAndSaveIndicators()
            }
        })
    },
    queryAndSaveIndicators: function(today) {
        var aDate = new Date()
        var aDay = aDate.getDate() < 10 ? '0' + aDate.getDate() : aDate.getDate();
        var aMonth = (aDate.getMonth() + 1) < 10 ? '0' + (aDate.getMonth() + 1) : aDate.getMonth() + 1;
        var aYear = String(aDate.getFullYear())
        var fDay = today ? aDay : '01';
        var fMonth = today ? aMonth : '01';
        var fYear = today ? aYear : '1990';
        listIndicator.forEach(function(e) {
            search.getIndicator(String(e.n), fDay, fMonth, fYear, aDay, aMonth, aYear).then(function(data) {
                data.forEach(function(d) {
                    new Indicator({
                        name: e.name,
                        date: new Date(d.date),
                        value: d.value
                    }).save();
                })
            })
        })
    }
}

module.exports = Query
