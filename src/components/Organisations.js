import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Callback from '../Callback/Callback'
import Button from './Button'
class Organisations extends PureComponent {
  state = {
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
  }

  validateRecord (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .update({ valid: true })
      .then(() => {
        this.updateOrganisations()
      })
      .catch(() => {

      })
  }

  /**
   * Delete Record
   * @param {Object} org Organisaton to be deleted
   */
  deleteRecord (org) {
    const ref = this.props.db.ref(`organisations/${org.uid}`)

    ref
      .remove()
      .then(() => {
        this.updateOrganisations()
      })
      .catch(() => {

      })
  }

  updateOrganisations () {
    this.setState({ isLoading: true })

    const ref = this.props.db.ref().child('organisations')

    ref.once('value', snap => {
      this.setState({
        isLoading: false,
        organisations: snap.val() || {}
      })
    })
  }

  componentWillMount () {
    this.updateOrganisations()
  }

  render () {
    const { organisations, isLoading } = this.state
    const { admin } = this.props
    const uids = Object.keys(organisations)

    return (
      <div className="col-sm-12">
        <div className="panel panel-default">
          {/* <!-- Default panel contents --> */}
          <div className="panel-heading" style={{height: '55px', fontSize: '2.4rem'}}>
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

          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Last Updated</th>
                  <th>Expiry Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Last Updated By</th>
                  { admin && (<th style={{ width: '210px' }}></th>)}
                </tr>
              </thead>
              <tbody>
                {
                  /* TODO Replace with "isLoading" */
                  isLoading
                  ? <tr><td colSpan="4"><Callback/></td></tr>
                  : (
                    uids.map((uid, i) => {
                      const org = { ...organisations[uid], uid: uid }

                      return (
                        <tr key={i}>
                          <td>{moment(org.updated).format('MMM Do YY')}</td>
                          <td>{moment(org.expiry).format('MMM Do YY')}</td>
                          <td>{org.organisation_name}</td>
                          <td>
                            {
                              org.service_type
                              ? org.service_type.map((s, i) => (
                                  <div
                                    key={i}
                                    className="label label-default"
                                    style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    {s}
                                  </div>
                                ))
                              : null
                            }
                          </td>
                          <td>{ org.updated_by }</td>
                          <td>
                            <Button
                              onClick={() => {
                                this.props.history.push('/form', { record: org })
                              }}
                            >
                              Edit
                            </Button>
                            {
                              admin &&
                              (
                                <button
                                  className="btn btn-default"
                                  onClick={this.validateRecord.bind(this, org)}
                                >
                                  Validate
                                </button>
                              )
                            }
                            {
                              admin &&
                              (
                                <button
                                  className="btn btn-default"
                                  onClick={this.deleteRecord.bind(this, org)}
                                >
                                  Delete
                                </button>
                              )
                            }
                          </td>
                        </tr>
                      )
                    })
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
