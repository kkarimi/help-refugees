import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import Callback from '../Callback/Callback'
import Button from './Button'
class Organisations extends PureComponent {
  state = {
    baseOrganisations: [],
    organisations: {},
    isLoading: true
  }

  static propTypes = {
    admin: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)

    // Bind function scopes to class
    this.validateRecord = this.validateRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.onNameSearch = this.onNameSearch.bind(this)
  }

  validateRecord (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .update({ valid: true })
      .then(() => this.updateOrganisations())
      .catch(() => {})
  }

  /**
   * Delete Record
   * @param {Object} org Organisaton to be deleted
   */
  deleteRecord (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .remove()
      .then(() => this.updateOrganisations())
      .catch(() => {})
  }

  selfAssign (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .update({ selfAssign: this.props.user.email, status: 'in_progress' })
      .then(() => this.updateOrganisations())
      .catch(() => {})
  }

  markAsDone (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .update({ status: 'verified', selfAssign: null })
      .then(() => this.updateOrganisations())
      .catch(() => {})
  }

  updateOrganisations () {
    this.setState({ isLoading: true })

    const ref = this.props.db.ref().child('organisations')

    ref.once('value', snap => {
      const value = snap.val() || {}
      const baseOrganisations = Object.keys(value).map(function (org) {
        return { ...value[org], uid: org }
      })

      this.setState({
        isLoading: false,
        baseOrganisations,
        organisations: baseOrganisations
      })
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

  componentWillMount () {
    this.updateOrganisations()
  }

  onNameSearch (evt) {
    const state = { nameSearch: evt.target.value }

    state.organisations = (
      state.nameSearch.length
      ? this.state.baseOrganisations.filter(function (org) {
        return new RegExp(state.nameSearch, 'ig').test(org.organisation_name)
      })
      : this.state.baseOrganisations
    )

    this.setState(state)
  }

  render () {
    const { organisations, isLoading, nameSearch } = this.state
    const { admin } = this.props

    return (
      <div className="col-sm-12">
        <div className="panel panel-default">
          {/* <!-- Default panel contents --> */}
          <div className="panel-heading" style={{ fontSize: '2.4rem' }}>
            <div className="row">
              Organisations
              <div className="pull-right">
                <button
                  className="btn btn-default"
                  onClick={() => this.props.history.push('/form')}
                >
                  New
                </button>
              </div>
            </div>
            <div className="row">
              <input
                className="form-control"
                type="text"
                value={nameSearch || ''}
                onChange={this.onNameSearch}
              />
            </div>
          </div>

          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                  {/* <th>Last Updated</th> */}
                  {/* <th>Expiry Date</th> */}
                  <th>Name</th>
                  <th>Type</th>
                  {/* <th>Last Updated By</th> */}
                  <th style={{ width: '210px' }}></th>
                </tr>
              </thead>
              <tbody>
                {
                  /* TODO Replace with "isLoading" */
                  isLoading
                  ? <tr><td colSpan="4"><Callback/></td></tr>
                  : (
                    organisations.map((org, i) => (
                      <tr key={i}>
                        <td>{ this.getStatusText(org.status) }</td>
                        {/* <td>{moment(org.updated).format('MMM Do YY')}</td> */}
                        {/* <td>{moment(org.expiry).format('MMM Do YY')}</td> */}
                        <td>{org.organisation_name}</td>
                        <td>
                          {org.serviceType && org.serviceType.map((s, i) => (
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
                          {
                            org.selfAssign
                            ? (
                              org.selfAssign !== this.props.user.email &&
                              <Button disabled="true" style={{ width: '210px', marginBottom: '0.2rem' }}>
                                Assigned to: {org.selfAssign}
                              </Button>
                            )
                            : (
                              <Button
                                styleType="success"
                                style={{ width: '210px' }}
                                onClick={this.selfAssign.bind(this, org)}
                              >
                                Self-assign
                              </Button>
                            )
                          }
                          {
                            /**
                             * Show edit button if:
                             * * organisation is not selfAssigned
                             * * the user is the same as the one assigned to the organisation
                             */
                            (org.selfAssign && org.selfAssign === this.props.user.email) &&
                            (
                              <Button
                                onClick={() => {
                                  this.props.history.push('/form', { record: org })
                                }}
                              >
                                Edit
                              </Button>
                            )
                          }
                          {
                            (admin || org.selfAssign === this.props.user.email) &&
                            (
                              <Button
                                onClick={this.validateRecord.bind(this, org)}
                              >
                                Validate
                              </Button>
                            )
                          }
                          {
                            admin &&
                            (
                              <Button
                                onClick={this.deleteRecord.bind(this, org)}
                              >
                                Delete
                              </Button>
                            )
                          }
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Organisations
