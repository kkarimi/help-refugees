import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ id, name, label, type = 'text', value, ...props }) => (
  <input
    id={id || name} // If the user does not supply an id, use the name of the field
    name={name}
    type={type}
    className={type !== 'checkbox' ? 'form-control' : null}
    value={value || ''}
    {...props}
  />
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string
}

export default InputField
