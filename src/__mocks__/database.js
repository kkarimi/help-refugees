export default {
  auth: {
    onAuthStateChanged () {

    }
  },
  db: {
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
}
