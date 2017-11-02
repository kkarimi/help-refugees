import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import AssignmentButton from './AssignmentButton'

class OrganisationRow extends Component {
  state = {

  }

  static propTypes = {
    org: PropTypes.object,
    admin: PropTypes.bool,
    user: PropTypes.object,
    selfAssign: PropTypes.func,
    onUnassign: PropTypes.func,
    validateRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
    history: PropTypes.object
  }

  getStatusText (status) {
    switch (status) {
      case 'in_progress':
        return <div className="label label-danger">In Progress</div>
      case 'needs_review':
        return <div className="label label-warning">Needs Review</div>
      case 'verified':
        return <div className="label label-success">Verified</div>
      default:
        return ''
    }
  }

  render () {
    const { org, admin, user, selfAssign, validateRecord, deleteRecord, onUnassign, history } = this.props

    return (
      <tr>
        <td>{ this.getStatusText(org.status) }</td>
        {/* <td>{moment(org.updated).format('MMM Do YY')}</td> */}
        {/* <td>{moment(org.expiry).format('MMM Do YY')}</td> */}
        <td>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700 }}>{org.name}</p>
            <p style={{ fontSize: '10px' }}>{org.details}</p>
            { org.url && <a style={{ fontSize: '10px' }} href={org.url}>{org.url}</a> }
          </div>

        </td>
        <td>
          {org.types && org.types.map((s, i) => (
            <div
              key={i}
              className="label label-default"
              style={{ display: 'block', marginBottom: '0.5rem' }}>
              {s}
            </div>
          ))}
        </td>
        {/* <td>{ org.updated_by }</td> */}
        <td>
          <AssignmentButton
            selfAssigned={org.selfAssign === user.email}
            org={org}
            onSelfAssign={selfAssign}
            onUnassign={onUnassign}
          />
          {
          /**
           * Show edit button if:
           * * organisation is not selfAssigned
           * * the user is the same as the one assigned to the organisation
           */
            (org.selfAssign && org.selfAssign === user.email) &&
          (
            <Button
              onClick={() => {
                history.push('/form', { record: org })
              }}
            >
              Edit
            </Button>
          )
          }
          {
            (admin || org.selfAssign === user.email) &&
            (
              <Button
                onClick={validateRecord.bind(this, org)}
              >
                Validate
              </Button>
            )
          }
          {
            admin &&
            (
              <Button
                onClick={deleteRecord.bind(this, org)}
              >
                Delete
              </Button>
            )
          }
        </td>
      </tr>
    )
  }
}

export default OrganisationRow
