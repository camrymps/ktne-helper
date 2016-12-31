'use strict'

module.exports = {
    isNumber: function(value) {
        if (!isNaN(value)) return true;
        else return 'Not a number!';
    }
}