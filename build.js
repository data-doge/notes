const showdown = require('showdown')
const converter = new showdown.Converter({ flavor: 'github' })
const parallelLimit = require('async/parallelLimit')
const sortBy = require('lodash.sortby')
const reverse = require('lodash.reverse')
const { readFile, readdirSync, writeFileSync } = require('fs')

const buildMd = (file, cb) => {
  readFile(`./entries/${file}`, 'utf-8', (err, md) => {
    if (err) cb(err)
    const html = converter.makeHtml(md)
    const ts = file.replace('.md', '')
    cb(null, { ts, html })
  })
}

const tasks = readdirSync('./entries').map(file => cb => buildMd(file, cb))

parallelLimit(tasks, 10, (err, results) => {
  if (err) throw err
  const sortedResults = reverse(sortBy(results, 'timestamp'))
  writeFileSync('./entries.js', `module.exports = ${JSON.stringify(sortedResults, null, 2)}`)
})
