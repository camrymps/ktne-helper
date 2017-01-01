'use strict'

const iq = require('inquirer')
const validators = require('./validators.js')
const cw = require('./helpers/complicated_wires')

var newGame = function() {
  // Retrieve necessary bomb properties from user
  iq.prompt([
    {
      type: 'list',
      name: 'serialNumberLastDigit',
      message: 'Is the last digit of the bomb\'s serial number even or odd?',
      choices: [
        {
          name: 'Even',
          value: 'even'
        },
        {
          name: 'Odd',
          value: 'odd'
        }
      ]
    },
    {
      type: 'list',
      name: 'parallelPort',
      message: 'Does the bomb posses a parallel port?',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ]
    },
    {
      type: 'input',
      name: 'batteryCount',
      message: 'How many batteries does the bomb posses?',
      validate: validators.isNumber,
      default: 2
    }
  ]).then(function (bombProps) {
    // Prompt user for module
    iq.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Select a helper:',
        choices: [
          {
            name: 'Complicated Wires',
            value: 'cw'
          }
        ]
      }
    ]).then(function (helper) {
      switch (helper.name) {
        case 'cw':
          cw.run(bombProps)
          break
      }
    })
  })  
}

newGame();