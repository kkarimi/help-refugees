import React, { PureComponent } from 'react'

class Navigation extends PureComponent {
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          {/* <!-- Brand and toggle get grouped for better mobile display --> */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              Help Refugees
            </a>
          </div>
        </div>{/* <!-- /.container-fluid --> */}
      </nav>
    )
  }
}

export default Navigation
