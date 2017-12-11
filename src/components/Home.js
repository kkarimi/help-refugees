import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Callback from '../Callback/Callback'

const query = gql`
  query HomeOrganisationsQuery($latitude: Float!, $longitude: Float!) {
    organisations(near: { latitude: $latitude, longitude: $longitude }) {
      name
      address
      location {
        coordinates
      }
    }
  }
`

function OrganisationList ({ data: { loading, error, organisations } }) {
  if (loading) {
    return <Callback/>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        Organisations Nearest You
      </div>
      <ul className="list-group">
        {organisations.map((org, i) => {
          return (
            <li className="list-group-item" key={i}>
              <p style={{ fontWeight: 600 }}>{org.name}</p>
              <small>{org.address}</small>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

OrganisationList.propTypes = {
  data: PropTypes.object.isRequired
}

const OrganisationListWithData = graphql(query, {
  options: ({ latitude, longitude }) => ({ variables: { latitude, longitude } })
})(OrganisationList)

class Home extends Component {
  state = {

  }

  componentWillMount () {
    this.setState({ loadingGeolocation: true })
    navigator.geolocation.getCurrentPosition(data => {
      this.setState({ loadingGeolocation: false, coords: data.coords })
    })
  }

  render () {
    const { loadingGeolocation, coords } = this.state

    if (loadingGeolocation) {
      return (
        <div>
          <Callback text={'Loading Your Location...'}/>
        </div>
      )
    }

    return (
      <OrganisationListWithData
        latitude={coords.latitude}
        longitude={coords.longitude}
      />
    )
  }
}

export default Home
