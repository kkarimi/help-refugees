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
module.exports = functions.auth.user().onCreate(event => {
  const uid = event.data.uid
  const email = event.data.email
  const photoUrl = event.data.photoUrl || ''

  /**
   * Create reference to new user
   */
  const newUserRef = ref.child(`/users/${uid}`)

  return newUserRef.set({
    photoUrl: photoUrl,
    email: email
  })
})
