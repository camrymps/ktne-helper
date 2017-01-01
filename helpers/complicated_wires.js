'use strict'

// Required modules
const _ = require('underscore')
const iq = require('inquirer')
require('colors')

// Dictionary of all possible wire properties
const dict = {
  C: [  // Cut wire
        [true, false, true, false],
        [false, false, true, false],
        [false, false, false, false]
  ],
  D: [  // Do not cut wire
        [true, true, true, true],
        [false, true, true, false],
        [false, false, false, true]
  ],
  S: [  // Cut if last digit of S/N is even
        [true, true, false, true],
        [true, true, false, false],
        [true, false, false, false],
        [false, true, false, false]
  ],
  P: [  // Cut if there is a parallel port
        [true, true, true, false],
        [false, true, true, true],
        [false, true, false, true]
  ],
  B: [  // Cut if there are 2 or more batteries
        [true, false, true, true],
        [true, false, false, true],
        [false, false, true, true]
  ]
}

/**
 * Finds a wire's equivalent properties in dictionary and
 * retrieves corresponding instruction letter.
 *
 * @param {Array} wireProps The wire's properties
 * @return Instruction letter (C, D, S, P or B)
 */
var getInstruction = function (wireProps) {
  for (let key in dict) {
    for (let i = 0; i < dict[key].length; i++) {
      if (_.isEqual(dict[key][i], wireProps)) return key
    }
  }
}

/**
 * Prints the decision.
 *
 * @param {Boolean} cut The decision (To cut or not to cut, that is the question)
 */
var out = function (cut) {
  if (cut) console.log('Cut wire'.black.bgWhite)
  else console.log('Do not cut wire'.black.bgWhite)
}

/**
 * Evaluates bomb and wire properties and makes a decision.
 *
 * @param {string} wireProps The wire's properties
 * @param {Object} envProps The bomb's properties
 */
var makeDecision = function (wireProps, bombProps) {
  switch (getInstruction(wireProps)) {
    case 'C':
      out(true)
      break
    case 'D':
      out(false)
      break
    case 'S':
      if (bombProps.serialNumberLastDigit === 'even') out(true)
      else out(false)
      break
    case 'P':
      if (bombProps.parallelPort) out(true)
      else out(false)
      break
    case 'B':
      if (bombProps.batteryCount >= 2) out(true)
      else out(false)
      break
  }
}

/**
 * Recursively prompts user for wire properties.
 *
 * @param {Object} bombProps The bomb's properties
 */
var sequence = function (bombProps) {
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
    makeDecision([
      _.contains(wire.props, 1), // Red
      _.contains(wire.props, 2), // Blue
      _.contains(wire.props, 3), // ★
      _.contains(wire.props, 4)  // LED
    ], bombProps)

    // Prompt user
    iq.prompt([{
      type: 'list',
      name: 'anotherWire',
      message: 'Another wire?',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ],
      default: function() {
        return true
      }
    }]).then(function (answer) {
      if (answer.anotherWire) return sequence(bombProps)
      else return
    })
  })
}

module.exports = {
  run: function (bombProps) {
    sequence(bombProps)
  }
}
