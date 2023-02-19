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
    name: 'Unforceverify',
    description: 'Removes Verification from a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('unforceverify')
    .setDescription('Removes Verification from a member in the Roblox Group.')
    .addStringOption(option =>
        option.setName('rblxusername')
        .setDescription('What is their Roblox Username?').setRequired(true)
        .setAutocomplete(true)
        )
    .addUserOption(option =>
        option.setName('discordusername')
        .setDescription('What is their Discord Username?').setRequired(true)
        ),

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const username = interaction.options.getString('rblxusername')
            const discorduser = interaction.options.getUser('discordusername')
            const id = await noblox.getIdFromUsername(username)
        const rank = await noblox.getRankInGroup(process.env.GroupID, id)
        const role1 = await noblox.getRole(process.env.GroupID, rank)
        const member = await interaction.guild.members.fetch(discorduser.id)
            await interaction.deferReply({ephemeral: true})
            try {
                if (username) {
                    let embed4 = new EmbedBuilder()
                    .setTitle('**Money Devs Verification!**')
                    .setColor('Green')
                    .setDescription(`Verification has been removed from ${username}`)
                    .setFooter({ text: `They will need to verify again!`, })
                    .setTimestamp(Date.now())
                    bot.db.delete(`RobloxInfo_${interaction.guild.id}_${member.id}`)
                    interaction.editReply({ embeds: [embed4]})
                 let findRole = "Verified"
                 let findRole2 = role1.name
                 const role = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                 const role2 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                 await member.roles.remove(role.id);
                 await member.roles.remove(role2.id);
                 setTimeout(() => {
                     interaction.deleteReply()
                 }, 3000)
                 interaction.editReply({ content: `**SUCCESS** | You have successfully removed verification from ${username}` })
                } 

            } catch (err) {
                console.log(err.message)
            }
        }
    }
