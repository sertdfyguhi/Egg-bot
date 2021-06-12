const discord = require('discord.js')
const watch = require('./watcher')
const client = new discord.Client()
const sub = 'oakeiaycwig_immk'

async function post_handler(post) {
  const guild = await client.guilds.cache.get('852338765439434772')
  const channel = await guild.channels.cache.get('853113711489056788')
  const embed = new discord.MessageEmbed()
    .setTitle('New post on r/' + sub)
    .setColor('RANDOM')
    .setURL(`https://reddit.com${post.permalink}`)
  
  await channel.send(embed)
}

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag)
  watch(sub, 5000, post_handler)
})

client.on('guildMemberAdd', async member => {
  const channel = await member.guild.channels.cache.get('853108646522912788')
  await channel.send(`${member} Welcome to the r/UnscramblingTheEggs discord server! Please read <#852338765439434774>.`)
})

client.login(process.env.TOKEN)