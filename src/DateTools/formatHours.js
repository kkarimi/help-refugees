/**
 * If the hour value is between 00:00 and 09:59, it must have a zero
 * as the first character of the hour input will not understand it.
 * This function will prepend a `0` if the length of the string is
 * only 4 instead of 5.
 * @param {string|undefined} h Hour value
 */
const addZero = h => h ? (h.length === 4 ? `0${h}` : h) : null

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
    return { open: addZero(hours[0]), close: addZero(hours[1]) }
  }
}

module.exports = formatHours
