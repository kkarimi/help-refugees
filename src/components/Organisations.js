import React, { PureComponent } from 'react'
import Callback from '../Callback/Callback'

class Organisations extends PureComponent {
  state = {
    organisations: {}
  }

  componentWillMount () {
    const ref = this.props.db.ref().child('organisations')

    ref.once('value', snap => {
      this.setState({ organisations: snap.val() || {} })
    })
  }

  render () {
    const { organisations } = this.state

    return (
      <div className="col-sm-8 col-sm-offset-2">
        <div className="panel panel-default">
          {/* <!-- Default panel contents --> */}
          <div className="panel-heading">Organisations</div>

          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Last Updated</th>
                  <th>Expiry Date</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(organisations).length === 0
                  ? <tr><td colSpan="4"><Callback/></td></tr>
                  : (
                    Object.keys(organisations).map((k, i) => {
                      const org = organisations[k]

                      return (
                        <tr key={i}>
                          <td>{org.last_updated}</td>
                          <td>{org.expired}</td>
                          <td>{org.organisation_name}</td>
                          <td>{
                            org.service_type
                            ? org.service_type.map((s, i) => <div key={i}>{s}</div>)
                            : null
                          }</td>
                          <td>
                            <button
                              className="btn btn-default"
                              onClick={() => {
                                this.props.history.push('/form', { record: org })
                              }}
                            >
                              Edit
                            </button>
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
