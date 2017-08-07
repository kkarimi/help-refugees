import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ id, name, label, type, value, ...props }) => (
  <input
    id={id || name} // If the user does not supply an id, use the name of the field
    name={name}
    type={type || 'text'}
    className="form-control"
    value={value || ''}
    {...props}
  />
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string
}

export default InputField
