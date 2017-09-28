import React, { PureComponent } from 'react'
import * as firebase from 'firebase'
import moment from 'moment'

import Select from './Form/ReactSelect'
import DaysOpen from './Form/DaysOpen'
import InputField from './Form/InputField'
import Label from './Form/Label'

import { types, formHelpers } from './constants'

import './OrganisationForm.css'

const FormGroup = ({ children }) => <div className="col-sm-12" style={{ marginBottom: '1rem' }}>{children}</div>

const FormInput = ({ children }) => <div className="col-sm-9">{children}</div>

const FormHelper = ({ fieldName, placement }) => {
  return (
    <i
      className="glyphicon glyphicon-question-sign"
      data-toggle="tooltip"
      data-placement={placement || 'right'}
      title={formHelpers[fieldName]}
    />
  )
}
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
    const defaultRecord = { openingHours: {} }
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

  componentDidMount () {
    // After the component has rendered, we can activate the tooltips
    $('[data-toggle="tooltip"]').tooltip()
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
                  <Label inputName="name">
                      Name
                    <FormHelper fieldName='name' placement='bottom' />
                  </Label>
                  <div className="col-sm-9">
                    <InputField
                      name="name"
                      value={record.name}
                      onChange={this.onFieldChange}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="type"> Service Type </Label>
                  <div className="col-sm-9">
                    <Select
                      value={record.types}
                      multi={true}
                      options={types.map(s => ({ label: s, value: s }))}
                      onChange={this.onSelectChange.bind(this, 'types')}
                    />
                  </div>
                </FormGroup>

                {/**
                    <div className="form-group">
                      <label htmlFor="region"> Region </label>
                      <InputField name="region" onChange={this.onFieldChange}/>
                    </div>
                   */}

                <FormGroup>
                  <Label inputName="city"> City </Label>
                  <div className="col-sm-9">
                    <InputField
                      name="city"
                      value={record.city}
                      onChange={this.onFieldChange}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="address"> Address </Label>
                  <div className="col-sm-9">
                    <InputField
                      name="address"
                      value={record.address}
                      onChange={this.onFieldChange}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="postCode"> Post Code </Label>
                  <div className="col-sm-9">
                    <InputField
                      name="postCode"
                      value={record.postCode}
                      onChange={this.onFieldChange}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="phone">Phone Number</Label>
                  <div className="col-sm-9">
                    <InputField
                      name="phone"
                      type="tel"
                      value={record.phone}
                      onChange={this.onFieldChange}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="url">Url</Label>
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
                  <Label inputName="email">Email</Label>
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
                  <Label inputName="details">Details</Label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      name="details"
                      value={record.details}
                      onChange={this.onFieldChange}
                    ></textarea>
                    <small style={{display: 'block'}}>
                        In a few sentences, provide details explaining
                        what the service is and what they offer in clear, simple language.
                    </small>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label inputName="volunteer_need"> Volunteer Need </Label>
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
                  <Label inputName="openingHours"> Opening Hours </Label>
                  <FormInput>
                    <DaysOpen
                      value={record.openingHours}
                      onChange={(openingHours) => this.setState({
                        record: { ...this.state.record, openingHours }
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
