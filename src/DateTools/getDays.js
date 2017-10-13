const argv = require('yargs').argv
const DAYS = require('./constants').DAYS

function getDays (d) {
  // Do not perform searching logic if `d` is only one day
  if (d.indexOf('-') === -1) return [d.toLowerCase()]
  else d = d.toLowerCase()

  /**
   * First day of range
   * @type {string}
   */
  const day1 = d.split('-')[0]

  /**
   * Last day in range
   * @type {string}
   */
  const day2 = d.split('-')[1]

  /**
   * If we have started added days to the `range` array
   * @type {boolean}
   */
  let started = false

  /**
   * If we have reached the end of the range and should
   * cease adding days to the `range` array
   * @type {boolean}
   */
  let ended = false

  /**
   * @type {array}
   */
  const range = []

  for (var i = 0; i < DAYS.length && ended !== true; i++) {
    // Set `started` to true once we have reached the first day
    if (DAYS[i] === day1) started = true

    // If we are within range, add day to `range`
    if (started === true) range.push(DAYS[i])

    // Set `ended` to false once we have reached the last day
    if (DAYS[i] === day2) ended = true
  }

  return range
}

if (require.main === module) {
  console.log(getDays(argv.days))
}

module.exports = getDays
