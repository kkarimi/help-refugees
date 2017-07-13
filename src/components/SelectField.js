import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SelectField extends PureComponent {
  state = {
    values: []
  };

  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  }

  handleChange = (event) => {
    var options = event.target.options
    var values = []

    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value)
      }
    }

    this.setState({ values })

    this.props.handleChange(this.props.name, values)
  }

  render () {
    return (
      <select
        name={this.props.name}
        className="ui fluid dropdown"
        ref="dropdown"
        onChange={this.handleChange}
        style={{width: '200px', textOverflow: 'ellipsis'}}
      >
        {this.props.options.map((type, i) => (
          <option value={type} key={i}>{type}</option>
        ))}
      </select>
    )
  }
}

export default SelectField
