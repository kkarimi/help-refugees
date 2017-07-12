import React from 'react'

export default ({ name, label, handleChange, type, value }) => (
  <div className="mdc-form-field">
    <div className="mdc-textfield" data-mdc-auto-init="MDCTextfield">
      <input
        id="firstname"
        type={type || 'text'}
        className="mdc-textfield__input"
        name={name}
        value={value}
        onChange={(evt) => handleChange(name, evt.target.value)}
      />
      <label htmlFor="firstname" className="mdc-textfield__label">
        {label}
      </label>
    </div>
  </div>
)
