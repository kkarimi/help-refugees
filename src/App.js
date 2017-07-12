import React, { Component } from 'react'
import logo from './logo.png'
import './App.css'
import Form from './components/Form'
import * as firebase from 'firebase'

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
    const { user, organisations } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <main className="ui grid">
          { !user ? (<div><button onClick={this.signIn}>Sign In</button></div>) : null}
          { user ? (<div><button onClick={this.signOut}>Sign Out</button></div>) : null}
          {
            user
              ? (
                <div>
                  <h3>Posts</h3>
                  <ul>
                    {Object.keys(organisations).map((k) => <li key={k}>{organisations[k].organisation_name}</li>)}
                  </ul>
                  <Form />
                </div>
              )
              : null
          }
        </main>
      </div>
    )
  }
}

export default App
