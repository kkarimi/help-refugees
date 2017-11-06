import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { types } from './constants'

class OrganisationTypes extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    hideLabel: PropTypes.bool
  }

  render () {
    const { value, onChange, hideLabel } = this.props
    return (
      <div>
        {!hideLabel && <label htmlFor="organisationType">Organisation Type</label>}
        <Select
          value={value}
          multi={true}
          options={types.map(s => ({ label: s, value: s }))}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default OrganisationTypes
