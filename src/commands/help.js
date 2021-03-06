exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    const funemoji = msg.channel.permissionsOf(Memer.bot.user.id).has('externalEmojis') ? '<:feelsgreatman:326155536800284673>' : ':joy:'
    msg.channel.createMessage({
      embed: {
        color: Memer.colors.purple,
        title: 'Available Commands',
        description: 'Try pls roast for roasting people, and pls report for reporting people for no reason.',
        fields: [
          { name: `${funemoji} Fun Commands`, value: 'asktrump, award, boo, dankrate, fart, greentext, joke, justright, kill, meme, memegen, mock, pupper, kitty, pun, porn, roast, say, shitpost' },
          { name: '📷 Image Manipulation', value: 'ban, batslap, brazzers, byemom, cancer,delete, hitler, jail, magik, pride, rip, salty, search, shit, spank, trigger, warp' },
          { name: '🔧 Utilities and Information', value: 'clean, credits, disable, enable, help, invite, patreon, prefix, stats' }
        ],
        footer: { text: 'New commands coming in Feb!' }
      }
    })
  } else {
    if (!Memer.cmds.has(args[0]) && !Memer.aliases.has(args[0])) {
      return
    }

    const prefix = (await Memer.db.getGuild(msg.channel.guild.id) || Memer.defaultGuildConfig).prefix

    const props = Memer.cmds.has(args[0]) ? Memer.cmds.get(args[0]).props : Memer.cmds.get(Memer.aliases.get(args[0])).props
    msg.channel.createMessage({ embed: {
      fields: [
        { 'name': 'Description:', 'value': props.description, inline: false },
        { 'name': 'Usage:', 'value': Memer.codeblock(props.usage.replace('{command}', `${prefix} ${props.name}`)), inline: false },
        { 'name': 'Aliases:', 'value': props.aliases[0] ? props.aliases.join(', ') : 'None', inline: false }
      ]
    } })
  }
}

exports.props = {
  name: 'help',
  usage: '{command}',
  aliases: ['cmds', 'commands'],
  cooldown: 1000,
  description: 'See a list of commands available.',
  perms: ['embedLinks']
}
