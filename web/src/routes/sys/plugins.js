/**
 * Created by Aaron on 2018/8/30.
 */
module.exports = {
    path: 'plugins',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/sys/plugins').default)
        }, 'Plugins')
    }
}