import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Callback from '../Callback/Callback'
import Button from './Button'
import AssignmentButton from './AssignmentButton'
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
    this.onSearch = this.onSearch.bind(this)
    this.onUnassign = this.onUnassign.bind(this)
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

  onUnassign (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .update({ selfAssign: null, status: 'needs_review' })
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

  onSearch (evt) {
    const state = { searchText: evt.target.value }

    state.organisations = (
      state.searchText.length
        ? this.state.baseOrganisations.filter(function (org) {
          return new RegExp(state.searchText, 'ig').test(JSON.stringify(org))
        })
        : this.state.baseOrganisations
    )

    this.setState(state)
  }

  render () {
    const { organisations, isLoading, searchText } = this.state
    const { admin } = this.props

    return (
      <div className="col-sm-12">
        <div className="panel panel-default">
          {/* <!-- Default panel contents --> */}
          <div className="panel-heading" style={{ fontSize: '2.4rem' }}>
            <div className="row">
              <div className="col-sm-12">
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
            </div>
            <div className="row" style={{ paddingTop: '8px' }}>
              <div className="col-sm-12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Filter"
                  value={searchText || ''}
                  onChange={this.onSearch}
                />
              </div>
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
                              selfAssigned={org.selfAssign === this.props.user.email}
                              org={org}
                              onSelfAssign={this.selfAssign}
                              onUnassign={this.onUnassign}
                            />
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
