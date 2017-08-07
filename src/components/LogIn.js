import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({redirectToReferrer: true})
    })
  }

  render () {
    const {from} = this.props.location.state || '/'

    return (
      <section>
        {/* If there is a user, redirect to where they were headed */}
        {this.props.user && <Redirect to={from}/>}

        {/**
          If there is from, this means that the user originally attempted to
          access a different route and they were redirected here. Therefore, we
          should notify them that the route they attempted to access requires
          authentication.
        */}
        {from && (
          <div className="alert alert-danger" role="alert">
            <p>You must log in to view the page at {from.pathname}</p>
          </div>
        )}

        <form onSubmit={this.handleSubmit} style={{marginTop: '2em'}}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              value={this.state.email || ''}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </fieldset>
          <fieldset style={{marginTop: '0.5em'}}>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              value={this.state.password || ''}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </fieldset>
          <fieldset style={{marginTop: '1em'}}>
            <button className="btn btn-default" type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default Login
