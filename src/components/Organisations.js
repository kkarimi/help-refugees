/* eslint no-console: 0 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Callback from '../Callback/Callback'
import { validateRecord } from '../firebase'
import OrganisatonRow from './OrganisationRow'
import Types from './OrganisationTypes'

class Organisations extends PureComponent {
  state = {
    baseOrganisations: [],
    organisations: {},
    isLoading: true
  }

  static propTypes = {
    admin: PropTypes.bool.isRequired,
    db: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    // Bind function scopes to class
    this.validateRecord = this.validateRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.onSearch = this.onSearch.bind(this)
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

  validateRecord (org) {
    validateRecord(org)
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

    ref.limitToFirst(10).once('value', snap => {
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

  filterByCategory (selected) {
    const types = selected.map(o => o.value)

    this.setState({
      selectedTypes: selected,
      organisations: (
        selected.length === 0
        ? this.state.baseOrganisations
        : this.state.baseOrganisations.filter(function (org) {
          // Select organisations which have a type that is selected
          return _.intersection(org.types, types).length > 0
        })
      )
    })
  }

  render () {
    const { organisations, isLoading, searchText, selectedTypes } = this.state
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
              <div className="col-sm-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  value={searchText || ''}
                  onChange={this.onSearch}
                />
              </div>
              <div className="col-sm-6" style={{ fontSize: 14 }}>
                <Types
                  value={selectedTypes}
                  onChange={this.filterByCategory.bind(this)}
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
                        <OrganisatonRow
                          key={org.uid}
                          admin={admin}
                          org={org}
                          db={this.props.db}
                          user={this.props.user}
                          validateRecord={this.validateRecord}
                          deleteRecord={this.deleteRecord}
                        />
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
