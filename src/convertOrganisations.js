const csvtojson = require('csvtojson')
const path = require('path')
const _ = require('lodash')
const formatOpeningHours = require('./DateTools/formatOpeningHours')

var admin = require('firebase-admin')
var serviceAccount = require('../firebaseServiceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stone-nucleus-173311.firebaseio.com'
})

const db = admin.database() // the real-time database

const ref = db.ref().child('organisations')

let count = 0
let organisations = []

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

csvtojson({ noheader: false })
  .fromFile(path.resolve(__dirname, './organisations.csv'))
  .on('json', function (obj) {
    const converted = {}

    // Convert spreadsheet record to Firebase record
    Object.keys(obj).forEach(h => {
      const heading = headingMapping[h]

      // Do not return value if there is none
      if (obj[h].length === 0) return void 0

      // Convert Yes & No to boolean values
      else if (obj[h] === 'No') converted[heading] = false
      else if (obj[h] === 'Yes') converted[heading] = true

      else if (heading === 'types') {
        // convert type to array
        converted[heading] = obj[h].split(';')
      } else if (heading === 'additionalInfo') {
        converted.types = converted.types.concat(obj[h].replace('\n', '').split('; '))
      } else if ((heading === 'expiry' || heading === 'updated') && !isNaN(new Date(obj[h]))) {
        // Convert `expiry` and `updated` to Dates
        converted[heading] = new Date(obj[h])
      } else if (heading === 'openingHours') {
        converted[heading] = formatOpeningHours(obj[h])
      } else {
        // `Trim` text to removing beginning and trailing whitespace
        converted[heading] = obj[h].trim()
      }

      if (converted.updated === void 0) converted.status = 'needs_review'
      else if (converted.updated !== void 0 && converted.expiry === void 0) converted.status = 'in_progress'
      else if (converted.expiry === void 0) converted.status = 'needs_review'
      // TODO Add something here assign a expiry of 90 days from now using moment

      if (converted.status === void 0) converted.status = 'needs_review'
    })

    organisations.push(converted)
  })
  .on('done', function () {
    organisations = organisations.map(org => {
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

    Promise
      .all(organisations.map(o => ref.push().set(o)))
      .then(() => {
        console.log(`${count} organisations added`)
        process.exit()
      })
      .catch(() => {
        console.log('Not all organisations added')
        process.exit()
      })
  })
