/**
 * Require functions
 * @type {Object}
 */
const functions = require('firebase-functions')

/**
 * Require admin in order to have access to database
 * @type {Object}
 */
const admin = require('firebase-admin')

/**
 * Create a reference to the database to be used in the following
 * funciton.
 */
const ref = admin.database().ref()

/**
 * event.data = UserRecrod
 * * displayName: string or null
 * * email: nullable string
 * * photoUrl: string or null
 * * uid: string
 */
module.exports = functions.auth.user().onDelete(event => {
  const uid = event.data.uid

  /**
   * Remove user from database
   */
  return ref.child(`/users/${uid}`).remove()
})
