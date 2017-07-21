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
