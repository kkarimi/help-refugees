import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'
import { GOOGLE_MAPS_API_KEY } from '../../constants'

const url = 'https://maps.googleapis.com/maps/api/geocode/json'

class LocationInput extends Component {
  static propTypes = {
    address: PropTypes.string
  }

  state = {

  }

  onKeyUp (input, callback) {
    if (input.length === 0) return new Promise(() => ({ options: [] }))

    this.setState({ loading: true })

    axios
      .get(url, {
        params: {
          address: input,
          key: GOOGLE_MAPS_API_KEY
        }
      })
      .then(response => {
        if (response.data === void 0) {
          console.log('Data does not exist', response) // eslint-disable-line
          return callback(new Error())
        }

        console.log(`${input}:`, response.data.results) // eslint-disable-line

        const options = response.data.results.map(o => ({
          label: o.formatted_address,
          value: { location: o.geometry.location, address: o.formatted_address }
        }))

        this.setState({ loading: false, search: input, options })
      })
  }

  onSelect (value) {
    console.log(value) // eslint-disable-line
  }

  render () {
    return (
      <Select
        name="location"
        isLoading={this.state.loading}
        options={this.state.options}
        onInputChange={this.onKeyUp.bind(this)}
        filterOptions={_ => _}
        onChange={this.onSelect}
      />
    )
  }
}

export default LocationInput
