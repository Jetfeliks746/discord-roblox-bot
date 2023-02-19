const { Client, Message } = require('discord.js')

/**
 * 
 * @param {Client} bot
 * @param {Message} message
 */
 module.exports.execute = (bot, message) => {
    if (message.author.bot) return
    if (!message.guild) return

    const prefix = '-'
    const args = message.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase()

    if (!bot.commands.has(command)) return

    bot.commands.get(command).execute(bot, message, args)
 }