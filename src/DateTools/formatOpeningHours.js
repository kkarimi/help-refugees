const _ = require('lodash')
const getDays = require('./getDays')
const formatHours = require('./formatHours')

/**
 *
 *
 * @param {any} hours
 * @returns
 */
function formatOpeningHours (hours) {
  if (/N\/A/ig.test(hours)) return {}
  return hours.split(', ').reduce((a, h) => {
    let day = getDays(h.split(': ')[0])
    let hours = h.split(': ')[1]

    if (day === 'open 24/7') {
      day = 'monday-sunday'
      hours = '0:00-23:59'
    }

    if (_.isArray(day)) {
      day.forEach(d => {
        a[d] = formatHours(hours)
      })
    } else if (_.isString(day)) {
      a[day] = formatHours(hours)
    }

    return a
  }, {})
}

module.exports = formatOpeningHours
