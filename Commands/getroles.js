const {
    Client,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    User,
    Guild,
    Events,
    PermissionsBitField,
} = require('discord.js')

const noblox = require('noblox.js')
require('dotenv').config();
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Getroles',
    description: 'Gets your roles from the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('getroles')
    .setDescription('Gets your roles from the Roblox Group.'),

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const username = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxusername`)
            const discorduser = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.discordid`)
            const id = await noblox.getIdFromUsername(username)
        const rank = await noblox.getRankInGroup(process.env.GroupID, id)
        const role1 = await noblox.getRole(process.env.GroupID, rank)
        const member = await interaction.guild.members.fetch(discorduser)
            await interaction.deferReply({ephemeral: true})
            try {
                if (username) {
                 let findRole = "Verified"
                 let findRole2 = role1.name
                 const role = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                 const role2 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                 await member.roles.set([role.id, role2.id]);
                 setTimeout(() => {
                     interaction.deleteReply()
                 }, 3000)
                 interaction.editReply({ content: `**SUCCESS** | You have successfully got roles for ${username}` })
                } else {
                  await  interaction.editReply({ content: `**ERROR** | You have Failed to get roles for ${username}` })
                }

            } catch (err) {
                console.log(err.message)
            }
        }
    }
