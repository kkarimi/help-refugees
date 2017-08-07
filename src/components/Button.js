import React from 'react'

export default ({ children, ...props }) => (
  <button className="btn btn-default" {...props}>{children}</button>
)
