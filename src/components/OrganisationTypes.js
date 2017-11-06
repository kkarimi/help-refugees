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

  state = {

  }

  render () {
    const { value, onChange } = this.props

    return (
      <Select
        multi={true}
        clearable={true}
        options={types.map(s => ({ label: s, value: s }))}
        value={value}
        onChange={onChange}
        placeholder="Types..."
      />
    )
  }
}

export default OrganisationTypes
