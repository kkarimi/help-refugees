import React, { Component } from 'react'
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom'
import history from './history'
import { auth, db } from './firebase'
import Form from './components/Form'
import Organisations from './components/Organisations'
import LogIn from './components/LogIn'
import Callback from './Callback/Callback'
import logo from './logo.png'
import './App.css'
import 'react-select/dist/react-select.css'

class App extends Component {
  state = {
    organisations: {}
  }

  constructor () {
    super()
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  signOut () {
    auth.signOut()
  }

  render () {
    const { user, organisations, isLoadingUser } = this.state // eslint-disable-line

    const MatchWhenAuthorized = ({component: Component, ...rest}) => (
      <Route {...rest} render={renderProps => (
        user ? (
          <Component {...renderProps} auth={auth} db={db} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: renderProps.location }
          }}/>
        )
      )}/>
    )

    return (
      <BrowserRouter history={history}>
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
                  <Route path="/login" render={(props) => <LogIn auth={auth} user={user} {...props} />} />
                  <MatchWhenAuthorized path="/form" component={Form} />
                  <MatchWhenAuthorized path="/organisations" component={Organisations} />
                  <MatchWhenAuthorized path="/" component={Organisations} />
                  {/* <MatchWhenAuthorized pattern="/profile" component={Profile} /> */}
                </Switch>
              )
            }
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App