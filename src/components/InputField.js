import React from 'react'

export default ({ id, name, label, handleChange, type, value, ...props }) => (
  <input
    id={id || name} // If the user does not supply an id, use the name of the field
    name={name}
    type={type || 'text'}
    className="form-control"
    value={value || ''}
    {...props}
  />
)
