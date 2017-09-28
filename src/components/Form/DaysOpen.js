import React, { Component } from 'react'
import InputField from './InputField'

class DaysOpen extends Component {
  constructor (props) {
    super(props)
    this.state = props.value || {}
    this.onOpenChange = this.onOpenChange.bind(this)
    this.onCloseChange = this.onCloseChange.bind(this)
  }

  onChange (name, { target: { checked } }) {
    this.setState({ [name]: checked === true ? {} : void 0 }, () => {
      this.props.onChange(Object.keys(this.state).reduce((obj, key) => {
        // Only add items whose value is not undefined
        return this.state[key] !== void 0 ? { ...obj, [key]: this.state[key] } : obj
      }, {}))
    })
  }

  onOpenChange (name, evt) {
    const value = { [name]: { ...this.state[name], open: evt.target.value } }

    this.setState(value)

    this.props.onChange({ ...this.state, ...value })
  }

  onCloseChange (name, evt) {
    const value = { [name]: { ...this.state[name], close: evt.target.value } }

    this.setState(value)

    this.props.onChange({ ...this.state, ...value })
  }

  render () {
    const value = this.state

    const days = [
      { name: 'monday', label: 'Monday' },
      { name: 'tuesday', label: 'Tuesday' },
      { name: 'wednesday', label: 'Wednesday' },
      { name: 'thursday', label: 'Thursday' },
      { name: 'friday', label: 'Friday' },
      { name: 'saturday', label: 'Saturday' },
      { name: 'sunday', label: 'Sunday' }
    ]

    return (
      <div className="col-sm-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {days.map(({ name, label }, i) => (
          <div className="row" key={i}>
            <div className="checkbox col-sm-5">
              <label htmlFor={`openingHours.${name}`}>
                <InputField
                  type="checkbox"
                  id={`openingHours.${name}`}
                  name={`openingHours.${name}`}
                  checked={value[name] || false}
                  onChange={this.onChange.bind(this, name)}
                />
                {label}
              </label>
            </div>
            {
              value[name] &&
              (
                <div className="col-sm-7">
                  <InputField
                    type="time"
                    className="col-sm-6"
                    id={`openingHours.${name}.open`}
                    name={`openingHours.${name}.open`}
                    value={value[name].open}
                    onChange={this.onOpenChange.bind(this, name)}
                  />
                  <InputField
                    type="time"
                    className="col-sm-6"
                    id={`openingHours.${name}.close`}
                    name={`openingHours.${name}.close`}
                    value={value[name].close}
                    onChange={this.onCloseChange.bind(this, name)}
                  />
                </div>
              )
            }
          </div>
        ))}
      </div>
    )
  }
}

export default DaysOpen
