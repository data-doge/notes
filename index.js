const $ = require('jquery')
const entries = require('./entries')

entries.map(({ts, html}) => {
  const $entry = $(`
    <div class='entry'>
      <div class='timestamp'>${ts}</div>
      ${html}
    </div>
  `)
  $('#container').append($entry)
})
