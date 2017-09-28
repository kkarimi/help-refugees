import React from 'react'
import Select from 'react-select'
import { organisationTypes } from './constants'

export default ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="organisationType">Organisation Type</label>
      <Select
        value={value}
        multi={true}
        options={organisationTypes.map(s => ({ label: s, value: s }))}
        onChange={onChange}
      />
    </div>
  )
}
