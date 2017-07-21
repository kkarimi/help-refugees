import React from 'react'

export default ({ id, name, label, handleChange, type, ...props }) => (
  <input
    id={id || name}
    type={type || 'text'}
    className="form-control"
    onChange={(evt) => handleChange(name, evt.target.value)}
    {...props}
  />
)
