import React, { Component } from 'react'
import Callback from '../Callback/Callback'
class Home extends Component {
  state = {

  }

  componentWillMount () {
    const ref = this.props.db.ref('organisations')
    this.setState({ loading: true })

    ref
      .limitToFirst(10)
      .once('value')
      .then(snapshot => {
        this.setState({
          loading: false,
          organisations: Object.keys(snapshot.val()).map(k => ({
            ...snapshot.val()[k],
            id: k
          }))
        })
      })
      .catch(err => {
        this.setState({ loading: false, error: err.message })
      })
  }

  render () {
    if (this.state.loading) {
      return <Callback/>
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Organisations
        </div>
        <ul className="list-group">
          {this.state.organisations
            ? this.state.organisations.map((org, i) => {
              return (
                <li className="list-group-item" key={i}> {org.name} </li>
              )
            })
            : <div/>
          }
        </ul>
      </div>
    )
  }
}

export default Home
