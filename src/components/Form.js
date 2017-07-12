import React, { PureComponent } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { serviceTypes, organisationTypes } from './constants'
import * as firebase from 'firebase'

class NewRecord extends PureComponent {
  state = {
    record: {}
  }

  constructor () {
    super()
    this.onFieldChange = this.onFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const newForm = firebase.database().ref('organisations').push() // eslint-disable-line
    newForm.set(this.state.record)
    console.log(this.state.record) // eslint-disable-line
  }

  onFieldChange (name, value) {
    const { record } = this.state

    this.setState({ record: { ...record, [name]: value } })
  }

  render () {
    return (
      <form
        action="#"
        id="organisation-form"
        className="ui sixteen wide column grid"
        onSubmit={this.handleSubmit}
      >
        <h1 className="mdc-typography--display1">New Organisation/Service</h1>
        <div className="two wide column"/>
        <div className="eight wide column">
          <div>
            <label htmlFor="organisation_name"> Organisation Name </label>
            <InputField name="organisation_name" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="service_type">Service Type</label>
            <SelectField options={serviceTypes} name="service_type" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="organisation-type">Organisation Type</label>
            <SelectField options={organisationTypes} name="organisation_type" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="region"> Region </label>
            <InputField name="region" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="city"> City </label>
            <InputField name="city" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="address"> Address </label>
            <InputField name="address" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="post_code"> Post Code</label>
            <InputField name="post_code" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="phone_number"> Phone Number </label>
            <InputField name="phone_number" type='tel' handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="url"> Url </label>
            <InputField name="url" type='url' handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="email"> Email </label>
            <InputField name="email" type="email" handleChange={this.onFieldChange} />
          </div>

          <div>
            <label htmlFor="service_details">
              Service Details: in a few sentences, provide details explaining
              what the service is and what they offer in clear, simple language.
            </label>
            <InputField name="service_details" handleChange={this.onFieldChange} />
          </div>

          <div>
            <label htmlFor="opening_hours">Opening Hours</label>
            <InputField name="opening_hours" handleChange={this.onFieldChange} />
          </div>

          <div>
            <label htmlFor="intended_service_user">
              Intended Service User (Refugees; Asylum Seekers; Volunteers; etc)
            </label>
            <InputField name="intended_service_user" handleChange={this.onFieldChange}/>
          </div>

          <div>
            <label htmlFor="nationalities_served"> Nationalities served </label>
            <InputField name="nationalities_served" handleChange={this.onFieldChange} />
          </div>

          <div>
            <label htmlFor="limitations">
              Limitations/ Capacity (e.g very small group/ waiting time 6 weeks)
            </label>
            <InputField name="limitations" handleChange={this.onFieldChange} />
          </div>

          <div>
            <label htmlFor="volunteer_need"> Volunteer Need </label>
            <InputField name="volunteer_need" handleChange={this.onFieldChange} />
          </div>
        </div>

        <button> Submit </button>
      </form>
    )
  }
}

export default NewRecord
