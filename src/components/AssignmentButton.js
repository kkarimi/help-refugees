import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const selfAssignButtonStyle = {
  width: '210px',
  marginBottom: '0.2rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}

class AssignmentButton extends PureComponent {
  static propTypes = {
    selfAssigned: PropTypes.bool.isRequired,
    org: PropTypes.object.isRequired,
    onSelfAssign: PropTypes.func.isRequired,
    onUnassign: PropTypes.func.isRequired
  }

  render () {
    const { selfAssigned, org, onSelfAssign, onUnassign } = this.props

    if (org.selfAssign) {
      if (selfAssigned) {
        return (
          <Button
            style={{ width: '210px', marginBottom: '0.2rem' }}
            onClick={() => onUnassign(org)}
          >
            Unassign
          </Button>
        )
      } else {
        return (
          <Button disabled="true" style={selfAssignButtonStyle}>
            <b>Assigned to:</b>
            <span
              title={org.selfAssign}
              style={{ marginLeft: '3px' }}
            >
              {org.selfAssign}
            </span>
          </Button>
        )
      }
    } else {
      return (
        <Button
          styleType="success"
          style={{ width: '210px' }}
          onClick={() => onSelfAssign(org)}
        >
          Self-assign
        </Button>
      )
    }
  }
}

export default AssignmentButton
