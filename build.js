const showdown = require('showdown')
const converter = new showdown.Converter({ flavor: 'github' })
const parallelLimit = require('async/parallelLimit')
const { readFile, readdirSync, writeFileSync } = require('fs')

const buildMd = (file, cb) => {
  readFile(`./entries/${file}`, 'utf-8', (err, md) => {
    if (err) cb(err)
    const html = converter.makeHtml(md)
    cb(null, html)
  })
}

const tasks = readdirSync('./entries').map(file => cb => buildMd(file, cb))

parallelLimit(tasks, 10, (err, results) => {
  if (err) throw err
  writeFileSync('./entries.js', `module.exports = ${JSON.stringify(results, null, 2)}`)
})
