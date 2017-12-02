import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import AssignmentButton from './AssignmentButton'
import { selfAssign, unassign } from '../database'
import Callback from '../Callback/Callback'

class OrganisationRow extends Component {
  constructor (props) {
    super(props)

    this.onSelfAssign = this.onSelfAssign.bind(this)
    this.onUnassign = this.onUnassign.bind(this)

    this.state = {
      org: props.org,
      selfAssigned: props.org.selfAssign === props.user.email
    }
  }

  static propTypes = {
    org: PropTypes.object,
    admin: PropTypes.bool,
    user: PropTypes.object,
    validateRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
    history: PropTypes.object
  }

  updateRow (state) {
    this.props.db
      .ref()
      .child(`organisations/${this.props.org.uid}`)
      .once('value', snap => {
        setTimeout(() => {
          this.setState({ org: snap.val(), loading: false, ...state })
        }, 1000)
      })
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

  onSelfAssign (org) {
    this.setState({ loading: true })

    selfAssign(org)
      .then(() => this.updateRow({ selfAssigned: true }))
      .catch(() => {})
  }

  onUnassign (org) {
    this.setState({ loading: true })

    unassign(org)
      .then(_ => this.updateRow({ selfAssigned: false }))
      .catch(() => {})
  }

  render () {
    const { admin, validateRecord, deleteRecord, history } = this.props
    const { org, selfAssigned, loading } = this.state

    if (loading) return (<tr><td colSpan="4"><Callback style={{ textAlign: 'center' }}/></td></tr>)

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
            selfAssigned={selfAssigned}
            org={org}
            onSelfAssign={this.onSelfAssign}
            onUnassign={this.onUnassign}
          />
          {
          /**
           * Show edit button if:
           * * organisation is not selfAssigned
           * * the user is the same as the one assigned to the organisation
           */
            (org.selfAssign && selfAssigned) &&
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
            (admin || selfAssigned) &&
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
