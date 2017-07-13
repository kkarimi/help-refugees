import React, { PureComponent } from 'react'

class Organisations extends PureComponent {
  state = {
    organisations: {}
  }

  render () {
    const { organisations = {} } = this.props

    return (
      <div className="col-sm-8 col-sm-offset-2">
        <div className="panel panel-default">
          {/* <!-- Default panel contents --> */}
          <div className="panel-heading">Organisations</div>
          {/*
            <div class="panel-body">
              <p>...</p>
            </div>
          */}

          {/* <!-- List group --> */}
          <ul className="list-group">
            {Object.keys(organisations).map((k) => <li className="list-group-item" key={k}>{organisations[k].organisation_name}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}
export default Organisations
