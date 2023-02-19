const { Client } = require('discord.js')
const noblox = require('noblox.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
require('dotenv').config();

const rest = new REST({version: '10'}).setToken(process.env.Token)

/**
 * 
 * @param {Client} bot 
 */
module.exports.execute = async (bot) => {
    let group = await noblox.getGroup(process.env.GroupID);
    let groupName = group.name;
    bot.user.setPresence({ activities: [{ name: groupName, type: Number(process.env.ActivityType) }], status: 'dnd'})

        try {

           const serverid = bot.guilds.cache.map(guild => guild.id).join(", "); 

            console.log('Started Refreshing Slash Commands')
    
            await rest.put(Routes.applicationGuildCommands(bot.user.id, serverid), {
                body: bot.slashcommands,
           })
           
            console.log('Refreshed Slash Commands')

       } catch (error) {
            console.log(error)
        }
 }