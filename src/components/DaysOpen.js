import React, { Component } from 'react'
import InputField from './InputField'

class DaysOpen extends Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
  }
  onChange (name, { target: { checked } }) {
    const value = { ...this.state.value, [name]: checked }
    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    const { value = {} } = this.state

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
      <div>
        {days.map(({ name, label }, i) => (
          <div className="checkbox" key={i}>
            <label htmlFor={`daysOpen.${name}`}>
              <InputField
                type="checkbox"
                id={`daysOpen.${name}`}
                name={`daysOpen.${name}`}
                checked={value[name]}
                onChange={this.onChange.bind(this, name)}
              />
              {label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

export default DaysOpen
