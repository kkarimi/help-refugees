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
    var values = event.target.options.reduce(function (a, o) {
      if (o.selected) a.push(o.value)
      return a
    }, [])

    this.setState({ values })

    this.props.handleChange(this.props.name, values)
  }

  render () {
    return (
      <select
        name={this.props.name}
        className="form-control"
        ref="dropdown"
        onChange={this.handleChange}
        style={{width: '200px', textOverflow: 'ellipsis'}}
      >
        {this.props.options.map((type, i) => (
          <option value={type} key={i} selected={this.state.values.indexOf(type)}>
            {type}
          </option>
        ))}
      </select>
    )
  }
}

export default SelectField
