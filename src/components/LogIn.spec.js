import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import LogIn from './LogIn'

describe('<Login/>', () => {
  test('renders children when passed in', () => {
    const wrapper = shallow((
      <BrowserRouter>
        <LogIn>
          <div className="unique" />
        </LogIn>
      </BrowserRouter>
    ))

    expect(wrapper.contains(<div className="unique" />)).to.equal(true)
  })
})
