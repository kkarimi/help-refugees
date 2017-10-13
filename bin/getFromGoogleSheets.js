// Load Environment variables
require('dotenv').config()

const winston = require('winston')
const google = require('googleapis')
const { argv } = require('yargs')
const { client_email, private_key } = require('../googleServiceAccount.json')

// Configure a JWT auth client
const auth = new google.auth.JWT(
  client_email,
  null,
  private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
)

/**
 * @type {google.sheets}
 */
const sheetsClient = google.sheets('v4')

/**
 * Convert rows in spreadsheet to objects, with the keys being 
 * spreadsheet the headers
 * @param {array} sheet Spreadsheet
 * @returns {{}} Record
 */
function convertRowToObject (rows) {
  const headers = rows[0].slice()

  // Remove header row
  rows.shift()

  // Iterate through all remaining rows
  return rows.map((row, index) =>
    // Iterate through columns in row
    rows[index].reduce((a, v, i) =>
      // Apply corresponding header from header row and assign value
      ({ ...a, [headers[i]]: v }), {})
  )
}

/**
 * Get rows from a Google Sheet
 * @param {string} id 
 * @param {string} range
 * @returns {Promise}
 */
function getSpreadsheetValues (id, range) {
  /**
   * @property {google.auth.JWT} auth
   * @property {string} spreadsheetId ID of Google Sheet
   * @property {string} range Range to get data
   */
  const params = {
    auth,
    spreadsheetId: id || process.env.SPREADSHEET_ID,
    range: range || argv.range
  }

  return new Promise(function (resolve, reject) {
    sheetsClient.spreadsheets.values.get(params, function (err, { values }) {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(convertRowToObject(values))
      }
    })
  })
}

if (require.main === module) {
  getSpreadsheetValues()
    .then(function (data) { })
    .catch(function (err) { winston.warn(err) })
}

module.exports = getSpreadsheetValues
