import React from 'react'
import { mount } from 'enzyme'
import Home from './Home'

describe('<Home/>', function () {
  test('should render organisations', function () {
    const db = {
      ref () {
        return {
          once () {
            return new Promise(function (resolve) {
              resolve({
                val: () => ({
                  foo: { name: 'foo' },
                  bar: { name: 'bar' }
                })
              })
            })
          }
        }
      }
    }
    const element = mount(<Home db={db}/>)

    // Test that loading spinner is shown before promise is resolved
    expect(element.find('[alt="loading"]').length).toEqual(1)

    // Must wrap in setTimeout otherwise the Promise would be executed
    // after these two elements have been run
    setTimeout(() => {
      expect(element.find('li').at(0).text()).toEqual(' foo ')
      expect(element.find('li').at(1).text()).toEqual(' bar ')
    }, 1)
  })
})
