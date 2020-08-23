/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    var convertHandler = new ConvertHandler();

    app.route('/api/convert')
    .get(function (req, res) {

        var input = convertHandler.getValidObjFromString(req.query.input);

        if (input.error) {
            return res.send({
                error_input: `Error ==> ${req.query.input}`,
                error: input
            });
        } else {
            var initNum = convertHandler.getNum(input.num);
            var initUnit = convertHandler.getUnit(input.unit);
            var returnNum = convertHandler.convert(initNum, initUnit);
            var returnUnit = convertHandler.getReturnUnit(initUnit);
            var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

            return res.send(toString);
        }
    });

};
