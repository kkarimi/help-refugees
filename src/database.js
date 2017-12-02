import firebase from 'firebase'
import { FIREBASE_CONFIG } from './constants'

let config = { ...FIREBASE_CONFIG }

// the root app just in case we need it
export const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.database() // the real-time database
export const auth = firebaseApp.auth() // the firebase auth namespace

export const storageKey = 'KEY_FOR_LOCAL_STORAGE'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}

/**
 * Validate that the current record data is accurate
 * @param {object} org Organisation to update
 */
export function validateRecord (org) {
  if (org.constructor !== Object) throw new Error('Must supply organisation')

  return (
    db
      .ref(`organisations/${org.uid}`)
      .update({ valid: true })
  )
}

/**
 * Assign an organisation to the currently signed in user
 * @param {object} org Organisation to update
 * @return {Promise}
 */
export function selfAssign (org) {
  return (
    db
      .ref(`organisations/${org.uid}`)
      .update({ selfAssign: auth.currentUser.email, status: 'in_progress' })
  )
}

export function unassign (org) {
  return (
    db
      .ref(`organisations/${org.uid}`)
      .update({ selfAssign: null, status: 'needs_review' })
  )
}
