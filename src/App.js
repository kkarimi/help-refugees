import React, { Component } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from './history'
import { auth, db } from './firebase'

import Organisations from './components/Organisations'
import OrganisationForm from './components/OrganisationForm'

import Home from './components/Home'
import LogIn from './components/LogIn'
import SignUp from './components/UserForm'
import Callback from './Callback/Callback'
import logo from './logo.png'
import './App.css'

class App extends Component {
  state = {
    isLoadingUser: true,
    organisations: {}
  }

  constructor () {
    super()
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      this.setState({
        user,
        isLoadingUser: false,
        admin: user && user.uid === '4msl5mEv5FZRi68RMTlDauHVV3T2'
      })
    })
  }

  signOut () {
    auth.signOut()
  }

  render () {
    const { admin, user, organisations, isLoadingUser } = this.state // eslint-disable-line

    const MatchWhenNotAuthorized = ({ component: Component, ...rest }) => (
      <Route {...rest} render={renderProps => (
        user ? (
          <Redirect to={{ pathname: '/organisations' }}/>
        ) : (
          <Component {...renderProps} auth={auth} db={db} admin={admin} user={user} />
        )
      )}/>
    )

    const MatchWhenAuthorized = ({component: Component, ...rest}) => (
      <Route {...rest} render={renderProps => (
        user ? (
          <Component {...renderProps} auth={auth} db={db} admin={admin} user={user} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: renderProps.location }
          }}/>
        )
      )}/>
    )

    return (
      <Router history={history}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="pull-right">
              {user ? (<div><button className="btn btn-default" onClick={this.signOut}>Sign Out</button></div>) : null}
            </div>
          </div>
          <main className="container" style={{paddingTop: '1rem'}}>
            {
              isLoadingUser
                ? <Callback/>
                : (
                  <Switch>
                    {/* <Route path="/home" render={(props) => <Home auth={auth} {...props} />} /> */}
                    <MatchWhenNotAuthorized path="/login" component={LogIn} />
                    <MatchWhenNotAuthorized path="/signup" component={SignUp} />
                    <MatchWhenAuthorized path="/form" component={OrganisationForm} />
                    <MatchWhenAuthorized path="/organisations" component={Organisations} />
                    <Route path="/" render={renderProps => (
                      user ? (
                        <Organisations {...renderProps} auth={auth} db={db} admin={admin} user={user} />
                      ) : (
                        <Home db={db} />
                      )
                    )}/>
                    {/* <MatchWhenAuthorized pattern="/profile" component={Profile} /> */}
                  </Switch>
                )
            }
          </main>
        </div>
      </Router>
    )
  }
}

export default App
