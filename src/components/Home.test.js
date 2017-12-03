import React from 'react'
import { mount } from 'enzyme'
import Home from './Home'
import { setTimeout } from 'timers'

describe('<Home/>', function () {
  let promise
  let db
  let ref

  beforeEach(function () {
    ref = {
      limitToFirst () {
        return this
      },
      once () {
        return promise
      }
    }

    db = {
      ref: () => ref
    }
  })
  test('should render organisations', function () {
    promise = new Promise(function (resolve) {
      resolve({
        val: () => ({
          foo: { name: 'foo' },
          bar: { name: 'bar' }
        })
      })
    })

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

  test('it should set error', function () {
    promise = new Promise(function (resolve, reject) {
      reject({ message: 'foo' }) // eslint-disable-line
    })

    const element = mount(<Home db={db} />)
    setTimeout(function () {
      expect(element.state().error).toEqual('foo')
    }, 1)
  })
})
