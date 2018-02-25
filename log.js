const moment = require('moment')
const { exec } = require('child_process')

const ts = moment().format()
exec('mkdir -p entries', err => {
  if (err) throw err
  const newFile = `entries/${ts}.md`
  exec(`touch ${newFile} && atom ${newFile}`, err => {
    if (err) throw err
  })
})
