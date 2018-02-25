const { exec } = require('child_process')
exec('node build.js && git add -A && git commit -m "new logs" && git push origin master && cd ../eugenelyn.ch-deploy && npm run deploy', err => {
  if (err) throw err
})
