import React, { Component } from 'react'
import InputField from './InputField'

const DayOpen = ({ value, name, label }) => (
  <div className="checkbox">
    <label htmlFor={`daysOpen.${name}`}>
      <InputField
        type="checkbox"
        id={`daysOpen.${name}`}
        name={`daysOpen.${name}`}
        value={value}
      />
      {label}
    </label>
  </div>
)
class DaysOpen extends Component {
  render () {
    const { value } = this.props
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
      <div className="form-group">
        <label htmlFor="daysOpen"> Days Open </label>
        {days.map((day, i) => <DayOpen key={i} name={day.name} label={day.label} value={value[day.name]} />)}
      </div>
    )
  }
}

export default DaysOpen
