/**
 * Created by Aaron on 2018/8/30.
 */
module.exports = {
    path: 'ssearch',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/secondResult/index').default)
        }, 'SecondResult')
    }
}