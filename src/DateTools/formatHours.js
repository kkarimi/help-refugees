/**
 * Turn a string like '9.00-14.00' to an object saying when
 * the open and close hours are.
 *
 * @param {undefined|string} hours Hours to format
 * @returns {undefined|{ open: string, close: string }}
 */
function formatHours (hours) {
  if (hours === void 0) return { open: null, close: null }
  else if (/Open/ig.test(hours)) return { open: '0:00', close: '23:59' }
  else if (/closed/ig.test(hours)) return { open: null, close: null }
  else {
    hours = hours.replace(/\./ig, ':').split('-')
    return { open: hours[0] || null, close: hours[1] || null }
  }
}

module.exports = formatHours
