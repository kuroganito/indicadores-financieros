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
            }else{
              Query.queryAndSaveIndicators(true)
            }
        })
    },
    queryAndSaveIndicators: function(today) {
        var aDate = new Date()
        var aDay = aDate.getDate() < 10 ? '0' + aDate.getDate() : aDate.getDate();
        var aMonth = (aDate.getMonth() + 1) < 10 ? '0' + (aDate.getMonth() + 1) : aDate.getMonth() + 1;
        var aYear = String(aDate.getFullYear())
        var fDay, fMonth, fYear;

        Indicator.find({}).sort({
            "date": -1
        }).limit(1).then(function(data) {
            if (today) {
                var fDate = new Date(data[0].date)
                fDay = fDate.getDate() < 10 ? '0' + fDate.getDate() : fDate.getDate();
                fMonth = (fDate.getMonth() + 1) < 10 ? '0' + (fDate.getMonth() + 1) : fDate.getMonth() + 1;
                fYear = String(fDate.getFullYear())
            } else {
                fDay = '01';
                fMonth = '01';
                fYear = '1990';
            }
            if ((today && aDay != fDay && aMonth != fMonth && fYear != fYear) || !today) {
                console.log("Haciendo la busqueda desde el dia: ", fDay,fMonth,fYear)
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
        })
    }
}

module.exports = Query
