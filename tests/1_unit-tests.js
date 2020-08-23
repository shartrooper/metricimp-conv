/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getNum(input)', function () {

        test('Whole number input', function (done) {
            var input = convertHandler.getValidObjFromString('32L');
            assert.equal(convertHandler.getNum(input.num), 32);
            done();
        });

        test('Decimal Input', function (done) {
            var input = convertHandler.getValidObjFromString('3.5KG');
            assert.equal(convertHandler.getNum(input.num), 3.5);
            done();
        });

        test('Fractional Input', function (done) {
            var input = convertHandler.getValidObjFromString('1/2mi');
            assert.equal(convertHandler.getNum(input.num), 0.5);
            done();
        });

        test('Fractional Input w/ Decimal', function (done) {
            var input = convertHandler.getValidObjFromString('1.5/3L');
            assert.equal(convertHandler.getNum(input.num), 0.5);
            done();
        });

        test('Invalid Input (double fraction)', function (done) {
            var input = convertHandler.getValidObjFromString('1.5/3/8.2L');
            assert.deepEqual(convertHandler.getNum(input), {
                error: 'invalid number'
            });
            done();
        });

        test('No Numerical Input', function (done) {
            var input = convertHandler.getValidObjFromString('kg');
            assert.equal(convertHandler.getNum(input.num), 1);
            done();
        });

    });

    suite('Function convertHandler.getUnit(input)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                //assert
                var input = convertHandler.getValidObjFromString(ele);
                assert.equal(convertHandler.getUnit(input.unit), ele.toLowerCase());
            });
            done();
        });

        test('Unknown Unit Input', function (done) {
            var input = convertHandler.getValidObjFromString('1.5/3');
            assert.deepEqual(convertHandler.getUnit(input), {
                error: 'no unit'
            });
            done();
        });

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            //see above example for hint
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.convert(num, unit)', function () {

        test('Gal to L', function (done) {
            var input = [5, 'gal'];
            var expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('L to Gal', function (done) {
            var input = [5, 'l'];
            var expected = 1.32085;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Mi to Km', function (done) {
            var input = [5, 'mi'];
            var expected = 8.0467;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Km to Mi', function (done) {
            var input = [5, 'km'];
            var expected = 3.10685;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Lbs to Kg', function (done) {
            var input = [5, 'lbs'];
            var expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Kg to Lbs', function (done) {
            var input = [5, 'kg'];
            var expected = 11.0231;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

    });

});
