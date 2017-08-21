import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import DaysOpen from './DaysOpen'

describe('DaysOpen', () => {
  it('should render without crashing', () => {
    expect(<DaysOpen/>).to.not.be.null
  })
})
