import React, { Component } from 'react'

class Home extends Component {
  state = {

  }

  componentWillMount () {
    const ref = this.props.db.ref('organisations')
    ref
      .once('value', snapshot => {
        this.setState({
          organisations: Object.keys(snapshot.val()).map(k => ({
            ...snapshot.val()[k],
            id: k
          }))
        })
      })
      .catch(function (err) {

      })
  }

  render () {
    return (
      <div>
        <ul>
          {this.state.organisations.map((org, i) => {
            return (
              <li key={i}> {org.name} </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Home
