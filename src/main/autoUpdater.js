import semver from 'semver'
import superagent from 'superagent'
import { version as currentVersion } from '../../package.json'

export default function autoUpdater (callback) {
  superagent
  .get('https://raw.githubusercontent.com/venkatgoud/ften/master/package.json')
  .end((err, res) => {
    if (err || !res.ok) {
      callback(err)
    } else {
      try {
        const newVersion = JSON.parse(res.text).version
        if (semver.gt(newVersion, currentVersion)) {
          callback(null, newVersion)
        }
      } catch (err) {
        callback(err)
      }
    }
  })
}
