import React from 'react'

export default ({ id, name, label, handleChange, type, value, ...props }) => (
  <input
    id={id || name}
    type={type || 'text'}
    className="form-control"
    {...props}
    onChange={(evt) => handleChange(name, evt.target.value)}
  />
)
