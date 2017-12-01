import React from 'react'
import { mount } from 'enzyme'
import Home from './Home'

const db = {
  ref () {
    return {
      once (p, cb) {
        cb({
          val () {
            return {
              foo: { name: 'foo' },
              bar: { name: 'bar' }
            }
          }
        })

        return {
          then: () => {},
          catch: () => {}
        }
      }
    }
  }
}

describe('<Home/>', function () {
  it('should render organisations', function () {
    const element = mount(<Home db={db}/>)
    expect(element.find('li').at(0).text()).toEqual(' foo ')
    expect(element.find('li').at(1).text()).toEqual(' bar ')
  })
})
