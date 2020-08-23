/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {

    const conversionCollection = {
        'gal': {
            constant: 3.78541,
            unit: 'l',
            spelled: 'gallons'
        },
        'l': {
            constant: 0.26417,
            unit: 'gal',
            spelled: 'liters'
        },
        'lbs': {
            constant: 0.453592,
            unit: 'kg',
            spelled: 'pounds'
        },
        'kg': {
            constant: 2.20462,
            unit: 'lbs',
            spelled: 'kilograms'
        },
        'mi': {
            constant: 1.60934,
            unit: 'km',
            spelled: 'miles'
        },
        'km': {
            constant: 0.62137,
            unit: 'mi',
            spelled: 'kilometers'
        }
    }

    const roundToFive = (result) => parseFloat(result.toFixed(5).replace(/^(\d+\.\d*?[1-9])0+$/g, '$1'));

    this.getValidObjFromString = (str) => {
        let arrOfValues = str.split(/([a-z]+$)/i);
        arrOfValues = arrOfValues.length > 2 ? arrOfValues.slice(0, 2) : arrOfValues;

        const validateArray = (arr) => {
            const errors = {
                INVALID_UNIT: {
                    error: 'invalid unit'
                },
                NO_UNIT: {
                    error: 'no unit'
                },
                INVALID_NUMBER: {
                    error: 'invalid number'
                },
                INVALID_ALL: {
                    error: `invalid number and unit`
                }
            };

            if (!arr[0] && arr.length === 1)
                return errors.INVALID_ALL;

            let[num, unit] = arr;

            const unitRegex = /^gal$|^l$|^kg$|^lbs$|^mi$|^km$/i;

            const filterFloat = function (value) {
                if (!/[^0-9\+\-\*\/\|\%.]|.+\/.*\/.*|\.{2,}/g.test(value)) {
                    let evalExp = eval(value);

                    return evalExp % 1 === 0 ? evalExp : evalExp.toFixed(5).replace(/^(\d+\.\d*?[1-9])0+$/g, '$1');
                };
                return NaN;
            }

            const validateOrThrowError = (...pair) => {

                if (!pair[0] && pair[1])
                    return errors.INVALID_NUMBER;
                else if (pair[0] && !pair[1])
                    return errors.INVALID_UNIT;
                else if (pair[0] && (pair[1] === 'no_unit'))
                    return errors.NO_UNIT;
                else if (!pair[0] && !pair[1])
                    return errors.INVALID_ALL;

                return {
                    num: pair[0],
                    unit: pair[1].toLowerCase()
                }
            };

            return validateOrThrowError(num !== '' ? filterFloat(num) : 1, unit ? (unitRegex.test(unit) ? unit : false) : 'no_unit');
        }

        return validateArray(arrOfValues);
    }

    this.getNum = function (input) {
        return input;
    };

    this.getUnit = function (input) {
        return input;
    };

    this.getReturnUnit = function (initUnit) {
        var result = conversionCollection[initUnit].unit;
        return result;
    };

    this.spellOutUnit = function (unit) {
        var result = conversionCollection[unit].spelled;
        return result;
    };

    this.convert = function (initNum, initUnit) {
        var result = initNum * conversionCollection[initUnit].constant;
        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        returnNum=roundToFive(returnNum);
        var result = {
            "initNum": initNum,
            "initUnit": initUnit,
            "returnNum": returnNum,
            "returnUnit": returnUnit,
            "string": `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
        };

        return result;
    };

}

module.exports = ConvertHandler;
