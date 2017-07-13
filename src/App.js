import React, { Component } from 'react'
import logo from './logo.png'
import './App.css'
import * as firebase from 'firebase'
import 'react-select/dist/react-select.css'

import Form from './components/Form'
// import Organisations from './components/Organisations'

var config = {
  apiKey: 'AIzaSyAec6n7bh_dhRuxZYxEGocCXyLJb6NpNfc',
  authDomain: 'stone-nucleus-173311.firebaseapp.com',
  databaseURL: 'https://stone-nucleus-173311.firebaseio.com',
  projectId: 'stone-nucleus-173311',
  storageBucket: 'stone-nucleus-173311.appspot.com',
  messagingSenderId: '232745848344'
}

firebase.initializeApp(config)

class App extends Component {
  state = {
    organisations: {}
  }

  constructor () {
    super()
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount () {
    this.auth = firebase.auth()
    this.database = firebase.database().ref()
    const postsRef = this.database.child('organisations')

    this.auth.onAuthStateChanged(user => {
      this.setState({ user })

      if (user) {
        postsRef.on('value', snap => {
          this.setState({ organisations: snap.val() || {} })
        })
      }
    })
  }

  signIn () {
    this.auth.signInAnonymously()
  }

  signOut () {
    this.auth.signOut()
  }

  render () {
    const { user, organisations } = this.state // eslint-disable-line

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="pull-right">
            { !user ? (<div><button className="btn btn-default" onClick={this.signIn}>Sign In</button></div>) : null}
            { user ? (<div><button className="btn btn-default" onClick={this.signOut}>Sign Out</button></div>) : null}
          </div>
        </div>
        <main className="container" style={{paddingTop: '1rem'}}>
          {
            user
              ? (
                <div>
                  {/* <Organisations organisations={organisations} /> */}
                  <Form />
                </div>
              )
              : (
                <div>
                  <h3> You must sign in by clicking the button above in order to view form. </h3>
                </div>
              )
          }
        </main>
      </div>
    )
  }
}

export default App
