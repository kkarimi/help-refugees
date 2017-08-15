import React, { PureComponent } from 'react'
import Select from 'react-select'
import * as firebase from 'firebase'
import moment from 'moment'

import DaysOpen from './DaysOpen'
import InputField from './InputField'
import { serviceTypes } from './constants'

import './OrganisationForm.css'

const FormGroup = ({ children }) => <div className="col-sm-12" style={{ marginBottom: '1rem' }}>{children}</div>

const FormLabel = ({ children, inputName }) => (
  <div className="col-sm-3">
    <label htmlFor={inputName}>{children}</label>
  </div>
)

const FormInput = ({ children }) => <div className="col-sm-9">{children}</div>
class NewRecord extends PureComponent {
  constructor (props) {
    super(props)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)

    /**
     * State will only be defined if a state object is passed to
     * history.push()
     */
    const { state } = props.location
    const defaultRecord = { daysOpen: {} }
    this.state = {
      record: state ? state.record || defaultRecord : defaultRecord
    }
  }

  handleSubmit (event) {
    const { record } = this.state
    event.preventDefault()

    this.setState({ submitting: true })

    const $button = $(this.refs.button)

    $button.button('loading')

    /**
     * Have to use .getTime() because Firebase will not store Dates
     * @param {*} date
     */
    const time = date => date.toDate().getTime()

    const recordWithFields = {
      ...record,
      // {Number} created     - Unix time when record was created
      created: record.created || time(moment()),
      // {Number} updated     - Unix time when record was updated
      updated: time(moment()),
      // {Number} expiry      - Unix time 30 days after record was updated
      expiry: record.expiry || time(moment().add(30, 'days')),
      // {String} updated_by  - Email of user who last updated record
      updated_by: this.props.user.email,
      // {String} status      - The current state of the organisation
      status: this.props.user.trusted ? 'verified' : 'needs_review'
    }

    const onFormSuccess = () => {
      this.setState({ submitting: false, record: {} })
      // Navigate back to organisations page
      this.props.history.push('/organisations')
    }

    const onFormFailure = () => {
      /**
       * TODO Set button to red displaying error
       * TODO Set timer to two seconds
       * TODO Render form with values filled in
       */
      this.setState({ submitting: false })
      $button.button('reset')
    }

    if (record.uid) {
      firebase.database().ref().child(`organisations/${record.uid}`)
        .update(recordWithFields)
        .then(onFormSuccess)
        .catch(onFormFailure)
    } else {
      firebase.database().ref('organisations').push()
        .set(recordWithFields)
        .then(onFormSuccess)
        .catch(onFormFailure)
    }
  }

  onFieldChange ({ target: { name, type, value, checked } }) {
    const { record } = this.state

    this.setState({
      record: {
        ...record,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  onSelectChange (name, value) {
    const { record } = this.state
    this.setState({ record: { ...record, [name]: value.map(v => v.value) } })
  }

  render () {
    const { record, submitting } = this.state

    // TODO Reload values from record
    return (
      <div className="col-sm-11">
        <div className="panel panel-default">
          <div className="panel-heading" style={{height: '55px', fontSize: '2.4rem'}}>
            New Organisation/Service
            <button
              className="btn btn-default pull-right"
              onClick={() => this.props.history.push('/organisations')}
            >
              Cancel
            </button>
          </div>
            <div className="panel-body">
              <form
                action="#"
                id="organisation-form"
                onSubmit={this.handleSubmit}
              >
                <div className={`${submitting ? 'submitting' : null} inputs`}>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="organisation_name"> Organisation Name </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="organisation_name"
                        value={record.organisation_name}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="serviceType">Service Type</label>
                    </div>
                    <div className="col-sm-9">
                      <Select
                        value={record.serviceType}
                        multi={true}
                        options={serviceTypes.map(s => ({ label: s, value: s }))}
                        onChange={this.onSelectChange.bind(this, 'serviceType')}
                      />
                    </div>
                  </FormGroup>

                  {/*
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
                  */}

                  {/**
                    <div className="form-group">
                      <label htmlFor="region"> Region </label>
                      <InputField name="region" onChange={this.onFieldChange}/>
                    </div>
                   */}

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="city"> City </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="city"
                        value={record.city}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="address"> Address </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="address"
                        value={record.address}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="post_code"> Post Code</label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="post_code"
                        value={record.post_code}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="phone_number"> Phone Number </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="phone_number"
                        type="tel"
                        value={record.phone_number}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="url"> Url </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="url"
                        type="url"
                        value={record.url}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="email"> Email </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="email"
                        type="email"
                        value={record.email}
                        onChange={this.onFieldChange}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="col-sm-3">
                      <label htmlFor="service_details"> Service Details </label>
                    </div>
                    <div className="col-sm-9">
                      <InputField
                        name="service_details"
                        value={record.service_details}
                        onChange={this.onFieldChange}
                      />
                      <small style={{display: 'block'}}>
                        In a few sentences, provide details explaining
                        what the service is and what they offer in clear, simple language.
                      </small>
                    </div>
                  </FormGroup>

                  {/*
                    <div className="form-group">
                      <label htmlFor="opening_hours">Opening Hours</label>
                      <InputField name="opening_hours" onChange={this.onFieldChange} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="intended_service_user">
                        Intended Service User (Refugees; Asylum Seekers; Volunteers; etc)
                      </label>
                      <InputField name="intended_service_user" onChange={this.onFieldChange}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="nationalities_served"> Nationalities served </label>
                      <InputField name="nationalities_served" onChange={this.onFieldChange} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="limitations">
                        Limitations/ Capacity (e.g very small group/ waiting time 6 weeks)
                      </label>
                      <InputField name="limitations" onChange={this.onFieldChange} />
                    </div>
                  */}

                  <FormGroup>
                    <FormLabel inputName="volunteer_need"> Volunteer Need </FormLabel>
                    <FormInput>
                      <InputField
                        type="checkbox"
                        name="volunteer_need"
                        value={record.volunteer_need}
                        onChange={this.onFieldChange}
                      />
                    </FormInput>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel inputName="daysOpen"> Days Open </FormLabel>
                    <FormInput>
                      <DaysOpen
                        value={record.daysOpen}
                        onChange={(daysOpen) => this.setState({
                          record: { ...this.state.record, daysOpen }
                        })}
                      />
                    </FormInput>
                  </FormGroup>

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
