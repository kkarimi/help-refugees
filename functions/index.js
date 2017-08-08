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
 * Initialise application in normal fashion
 */
admin.initializeApp(functions.config().firebase)

exports.onUserCreate = require('./onUserCreate')

exports.onUserDelete = require('./onUserDelete')
