/* eslint no-console: 0 */
const _ = require('lodash')
const winston = require('winston')
const formatOpeningHours = require('../src/DateTools/formatOpeningHours')
const getFromGoogleSheets = require('./getFromGoogleSheets')

var admin = require('firebase-admin')
var serviceAccount = require('../firebaseServiceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stone-nucleus-173311.firebaseio.com'
})

const db = admin.database() // the real-time database

const ref = db.ref().child('organisations')

let count = 0

const headingMapping = {
  'ov': 'updated_by',
  'Last updated (DD/MM/YY)': 'updated',
  'Expiry Date?': 'expiry',
  'Name': 'name',
  'Service Type': 'types',
  'Additional/other (separate each type with a semi-colon)': 'additionalInfo',
  'Details (who, what, when, where, why)': 'details',
  'Region': 'region',
  'City/ Town': 'city',
  'Address': 'address',
  'Post Code': 'postCode',
  'Phone': 'phone',
  'URL': 'url',
  'Email': 'email',
  'Hours': 'openingHours',
  'Volunteer need?': 'volunteerNeed'
}

// Get latest data from Google Spreadsheet
getFromGoogleSheets('1cgkkCwMo70T36Prkhxbj0DWiSLgDahUCWhS63O4_40k', 'Old')
  .then(function (data) {
    return data.map(function (obj) {
      // Convert spreadsheet record to Firebase record
      return Object.keys(obj).reduce((converted, h) => {
        const heading = headingMapping[h]

        // Do not return value if there is none
        if (obj[h].length === 0) return converted

        switch (heading) {
          case 'types':
            // convert type to array
            converted[heading] = obj[h].split(';')
            break
          case 'additionalInfo':
            converted.types = converted.types.concat(obj[h].replace('\n', '').split('; '))
            break
          case 'expiry':
          case 'updated':
            // Convert `expiry` and `updated` to Dates
            converted[heading] = !isNaN(new Date(obj[h])) ? new Date(obj[h]) : null
            break
          case 'openingHours':
            converted[heading] = formatOpeningHours(obj[h])
            break
          default:
            // `Trim` text to removing beginning and trailing whitespace
            converted[heading] = obj[h].trim()
        }

        if (converted.updated === void 0) converted.status = 'needs_review'
        else if (converted.updated !== void 0 && converted.expiry === void 0) converted.status = 'in_progress'
        else if (converted.expiry === void 0) converted.status = 'needs_review'
        // TODO Add something here assign a expiry of 90 days from now using moment

        if (converted.status === void 0) converted.status = 'needs_review'

        if (converted[heading] === 'No') converted[heading] = false
        else if (converted[heading] === 'Yes') converted[heading] = true

        return converted
      }, {})
    })
  })
  .then(function (converted) {
    return converted.map(org => {
      org.types = _.isArray(org.types) && org.types.map(t => {
        switch (t) {
          case 'Children and Young People':
            return 'Children & Young People'
          case 'Destitution':
            return 'Destitution & Debt'
          case 'Employment/ Training/ Volunteering':
          case 'Employment/ Training /Volunteering':
            return 'Employment / Training / Volunteering'
          case 'Health':
          case 'Healthcare/ Mental Health / Disability':
            return 'Healthcare / Mental Health / Disability'
          case 'Social':
          case 'Social (groups, clubs)':
            return 'Social (clubs, groups)'
          default:
            return t
        }
      })

      return org
    })
  })
  .then(function (converted) {
    winston.info(`${converted.length} converted`)
    return converted
  })
  .then(function (organisations) {
    return ref.remove().then(() => organisations)
  })
  .then(function (organisations) {
    winston.info('All organisations removed')

    return (
      Promise
        .all(
          organisations
            .map(o =>
              ref
                .push()
                .set(o)
                .catch(err => err)
            )
        )
    )
  })
  .then((_) => {
    winston.info(`${_.length} organisations added`)
    process.exit()
  })
  .catch(function (err) {
    winston.error(`Error: ${JSON.stringify(err, null, 2)}`)
    process.exit()
  })
