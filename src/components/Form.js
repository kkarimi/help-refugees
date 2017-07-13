import React, { PureComponent } from 'react'
import InputField from './InputField'
import { serviceTypes, organisationTypes } from './constants'
import * as firebase from 'firebase'
import Select from 'react-select'
import './Form.css'

class NewRecord extends PureComponent {
  state = {
    record: {}
  }

  constructor () {
    super()
    this.onFieldChange = this.onFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const newForm = firebase.database().ref('organisations').push() // eslint-disable-line

    this.setState({ submitting: true })

    const $button = $(this.refs.button)

    $button.button('loading')

    newForm
      .set(this.state.record)
      .then(() => {
        this.setState({ submitting: false, record: {} })
        $button.button('reset')
      })
      .catch(() => {
        /**
         * TODO Set button to red displaying error
         * TODO Set timer to two seconds
         * TODO Render form with values filled in
         */
        this.setState({ submitting: false })
        $button.button('reset')
      })
  }

  onFieldChange (name, value) {
    const { record } = this.state

    this.setState({ record: { ...record, [name]: value } })
  }

  onSelectChange (name, value) {
    const { record } = this.state
    this.setState({ record: { ...record, [name]: value } })
  }

  render () {
    const { record, submitting } = this.state

    // TODO Reload values from record
    return (
      <div className="col-sm-8 col-sm-offset-2">
        <div className="panel panel-default">
          <div className="panel-heading">New Organisation/Service</div>
            <div className="panel-body">
              <form
                action="#"
                id="organisation-form"
                onSubmit={this.handleSubmit}
              >
                <div className={`${submitting ? 'submitting' : null} inputs`}>
                  <div className="form-group">
                    <label htmlFor="organisation_name"> Organisation Name </label>
                    <InputField name="organisation_name" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="serviceType">Service Type</label>
                    <Select
                      value={record.serviceType}
                      multi={true}
                      options={serviceTypes.map(s => ({ label: s, value: s }))}
                      onChange={this.onSelectChange.bind(this, 'serviceType')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="organisationType">Organisation Type</label>
                    <Select
                      value={record.organisationType}
                      multi={true}
                      options={organisationTypes.map(s => ({ label: s, value: s }))}
                      onChange={this.onSelectChange.bind(this, 'organisationType')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="region"> Region </label>
                    <InputField name="region" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city"> City </label>
                    <InputField name="city" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address"> Address </label>
                    <InputField name="address" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="post_code"> Post Code</label>
                    <InputField name="post_code" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number"> Phone Number </label>
                    <InputField name="phone_number" type='tel' handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="url"> Url </label>
                    <InputField name="url" type='url' handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <InputField name="email" type="email" handleChange={this.onFieldChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service_details">
                      Service Details
                    </label>
                    <small style={{display: 'block'}}>
                      In a few sentences, provide details explaining
                      what the service is and what they offer in clear, simple language.
                    </small>
                    <InputField name="service_details" handleChange={this.onFieldChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="opening_hours">Opening Hours</label>
                    <InputField name="opening_hours" handleChange={this.onFieldChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="intended_service_user">
                      Intended Service User (Refugees; Asylum Seekers; Volunteers; etc)
                    </label>
                    <InputField name="intended_service_user" handleChange={this.onFieldChange}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="nationalities_served"> Nationalities served </label>
                    <InputField name="nationalities_served" handleChange={this.onFieldChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="limitations">
                      Limitations/ Capacity (e.g very small group/ waiting time 6 weeks)
                    </label>
                    <InputField name="limitations" handleChange={this.onFieldChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="volunteer_need"> Volunteer Need </label>
                    <InputField name="volunteer_need" handleChange={this.onFieldChange} />
                  </div>
                </div>
                <button
                  ref="button"
                  style={{width: '100%'}}
                  className="btn btn-success"
                  data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing..."
                >
                  Submit
                </button>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default NewRecord
