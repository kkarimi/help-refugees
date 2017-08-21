import React, { Component } from 'react'
import firebase from 'firebase'
import InputField from './Form/InputField'
import Button from './Button'
class UserForm extends Component {
  state = {
    user: {
      email: '',
      password: '',
      organisation: ''
    }
  }

  constructor (props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.setState({ user: { ...this.state.user, [name]: value } })
  }

  signUp = (evt) => {
    evt.preventDefault()

    const { email, password } = this.state.user

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
         // TODO Find way to set newsletter & organisation to user object
      })
      .catch(({ message }) => {
        this.setState({
          // Display error message
          error: message
        })
        // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
        // ...
      })
  }

  render () {
    const { error, user: { email, password, organisation, newsletter } } = this.state

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Sign Up
        </div>
        <div className="panel-body">
          { error && (<div className="alert alert-danger">{error}</div>)}
          <form onSubmit={this.signUp}>
            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <InputField
                name="email"
                type="email"
                value={email}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <InputField
                name="password"
                type="password"
                value={password}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organisation"> Organisation </label>
              <InputField
                name="organisation"
                type="organisation"
                value={organisation}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="organisation">
                <InputField
                  type="checkbox"
                  name="newsletter"
                  value={newsletter}
                  onChange={this.onFieldChange}
                />
                Subscribe to newsletter?
               </label>
            </div>
            <div className="form-group">
              <Button styleType="success"> Sign Up </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UserForm
