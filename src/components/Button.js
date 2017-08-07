import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, styleType, ...props }) => (
  <button className={`btn btn-${styleType || 'default'}`} {...props}>{children}</button>
)

Button.propTypes = {
  styleType: PropTypes.string
}

export default Button
