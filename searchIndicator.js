var htmlToJson = require('html-to-json');

var Search = {
    getIndicator: function(indicator, iDay, iMonth, iYear, fDay, fMonth, fYear) {
        console.log(indicator, iDay, iMonth, iYear, fDay, fMonth, fYear)
        console.log("http://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=" + indicator + "&dfecha=" + iDay + "%2F" + iMonth + "%2F" + iYear + "&hfecha=" + fDay + "%2F" + fMonth + "%2F" + fYear)
        return new Promise(function(resolve, reject) {
            htmlToJson.request("http://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=" + indicator + "&dfecha=" + iDay + "%2F" + iMonth + "%2F" + iYear + "&hfecha=" + fDay + "%2F" + fMonth + "%2F" + fYear, {
                    'response': ['td.txt', function($text) {
                        return $text.text();
                    }]
                },
                function(err, result) {
                    if (err) reject(err)
                    var finalResult = [];
                    result = result.response
                    for (var i = 2; i < result.length; i += 2) {
                        var dateT = result[i].split("");
                        temp = dateT[0];
                        dateT[0] = dateT[3];
                        dateT[3] = temp;
                        temp = dateT[1];
                        dateT[1] = dateT[4];
                        dateT[4] = temp;
                        result[i] = dateT.join("");
                        finalResult.push({
                            date: result[i],
                            value: result[i + 1]
                        });
                    }
                    resolve(finalResult)
                });
        });
    }
}

module.exports = Search;
