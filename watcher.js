const snoowrap = require('snoowrap')
const reddit = new snoowrap({
  userAgent: 'by u/sertdfyguhi',
  clientId: process.env.app_id,
  clientSecret: process.env.secret,
  username: process.env.user,
  password: process.env.pass
})

async function watch(sr, interval, cb) {
  const sub = await reddit.getSubreddit(sr)
  let old = await sub.getNew({limit: 1000}).map(post => post)

  setInterval(async function(){
    const new_ = await sub.getNew({limit: 1000}).map(post => post)
    if (new_.length > old.length) {
      cb(new_[0])
    }
    old = new_
  }, interval)
}

module.exports = watch