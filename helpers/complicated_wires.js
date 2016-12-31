'use strict'

/* Required modules */
const _ = require('underscore'),
    iq = require('inquirer'),
    colors = require('colors'),
    validators = require('../validators');

/* Dictionary of all possible wire properties */
const dict = {
    C: [
        [true, false, true, false],
        [false, false, true, false],
        [false, false, false, false],
    ],
    D: [
        [true, true, true, true],
        [false, true, true, false],
        [false, false, false, true]
    ],
    S: [
        [true, true, false, true],
        [true, true, false, false],
        [true, false, false, false],
        [false, true, false, false]
    ],
    P: [
        [true, true, true, false],
        [false, true, true, true],
        [false, true, false, true]
    ],
    B: [
        [true, false, true, true],
        [true, false, false, true],
        [false, false, true, true]
    ]
};

/**
 * Recursively prompts user for wire property selection n (wire count) times.
 * 
 * @param {number} wireCount Number of wires
 * @param {Object} envProps Environment properties (see 'run' method in module exports)
 */
var sequence = function (wireCount, envProps) {
    if (wireCount != 0) {
        iq.prompt([{
            type: 'checkbox',
            name: 'props',
            message: 'Select all wire properties:',
            choices: [{
                name: 'Red',
                value: 1
            }, {
                name: 'Blue',
                value: 2
            }, {
                name: 'Star (★)',
                value: 3
            }, {
                name: 'LED on',
                value: 4
            }]
        }]).then(function (wire) {
            // This wire's properties
            let wireProps = [
                _.contains(wire.props, 1), // Red
                _.contains(wire.props, 2), // Blue
                _.contains(wire.props, 3), // ★
                _.contains(wire.props, 4)  // LED
            ];

            // Find this wire's equivalent properties in dictionary and retrieve corresponding key
            let matchedPropsKey = matchProps(wireProps);

            // Evaluate properties
            doLogic(matchedPropsKey, envProps);

            // Call recursive method
            sequence((wireCount - 1), envProps);
        });
    }
}

/**
 * Finds equivalent wire properties in dictionary.
 *  
 * @param {Array} props The wire's properties
 * @return Dictionary key (C, D, S, P or B)
 */
var matchProps = function (props) {
    for (let key in dict) {
        for (let i = 0; i < dict[key].length; i++) {
            if (_.isEqual(dict[key][i], props)) return key;
        }
    }
}

/**
 * Prints output.
 * 
 * @param {Boolean} cut The decision
 */
var out = function(cut) {
    if (cut) console.log('Cut wire'.black.bgWhite);
    else console.log('Do not cut wire'.black.bgWhite);
}

/**
 * Evaluates environment and wire properties and makes a decision.
 * 
 * @param {string} dictKey Key in the dictionary
 * @param {Object} envProps Environment properties
 */
var doLogic = function(dictKey, envProps) {
    switch(dictKey) {
        case 'C':
            out(true);
            break;
        case 'D':
            out(false);
            break;
        case 'S':
            if (envProps.S) out(true);
            else out(false);
            break;
        case 'P':
            if (envProps.P) out(true);
            else out(false);
            break;
        case 'B':
            if (envProps.B) out(true);
            else out(false);
            break;
    }
}

module.exports = {
    run: function () {
        iq.prompt([{
            type: 'input',
            name: 'wireCount',
            message: 'Number of complicated wires:',
            validate: validators.isNumber,
            default: 1
        }, {
            type: 'checkbox',
            name: 'props',
            message: 'Select all that apply:',
            choices: [{
                name: 'Last digit of S/N is even',
                value: 1
            }, {
                name: 'Has parallel port',
                value: 2
            }, {
                name: 'Two or more batteries',
                value: 3
            }]
        }]).then(function (env) {
            sequence(
                env.wireCount, {
                    S: _.contains(env.props, 1), // Even S/N
                    P: _.contains(env.props, 2), // Parallel port
                    B: _.contains(env.props, 3)  // Two batteries
                }
            );
        });
    }
}