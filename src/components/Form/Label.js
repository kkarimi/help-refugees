import React from 'react'
import PropTypes from 'prop-types'

const FormLabel = ({ children, inputName }) => (
  <div className="col-sm-3">
    <label htmlFor={inputName}>{children}</label>
  </div>
)

FormLabel.propTypes = {
  inputName: PropTypes.string.isRequired
}

export default FormLabel
