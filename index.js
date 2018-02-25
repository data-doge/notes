const $ = require('jquery')
const entries = require('./entries')

entries.map(html => {
  const $entry = $(`
    <div class='entry'>
      ${html}
    </div>
  `)
  $('#container').append($entry)
})
