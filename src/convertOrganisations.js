const csvtojson = require('csvtojson')
const path = require('path')
let count = 0
let needCorrectedHours = 0
const organisations = []

/**
 * Check that hours are properly formatted
 *
 * @param {{}} obj
 */
function checkForFormattedHours (obj, print) {
  const hours = obj['Opening hours']
  if (hours.length && !/N\/A/ig.test(hours) && hours.indexOf('Monday') === -1) {
    console.log(obj['Opening hours'])
    console.log('')
    needCorrectedHours++
  }
}

csvtojson({ noheader: false })
  .fromFile(path.resolve(__dirname, './organisations.csv'))
  .on('json', function (obj) {
    const updated = obj['Last updated (DD/MM/YY)']
    const expiry = obj['Expiry Date?']
    const detailsKey = 'Details: a few sentences about the organisation in plain English'

    if (updated.length && !isNaN(new Date(updated))) {
      obj.updated = new Date(updated)
    }
    delete obj['Last updated (DD/MM/YY)']

    if (expiry.length && !isNaN(new Date(expiry))) {
      obj.expiry = new Date(expiry)
    }
    delete obj['Expiry Date?']

    obj.limitations = (
      obj['Limitations/ Capacity (e']['g very small group/ waiting time 6 weeks)']
    )
    delete obj['Limitations/ Capacity (e']

    obj.details = (
      obj[detailsKey][' Include whether it is a drop in service, which nationalities are catered for (if this is specified), and whether travel expenses are included']['']
    )
    delete obj[detailsKey]

    obj.additionalInfo = obj['Additional/other'][' Separate each type with a semi-colon']
    delete obj['Additional/other']

    organisations.push(obj)

    count++

    checkForFormattedHours(obj)
  })
  .on('done', function () {
    // console.log(organisations)
    console.log('Number of rows:' + count)
    console.log('Need corrected hours:' + needCorrectedHours)
  })
