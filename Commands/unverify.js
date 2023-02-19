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
    name: 'Unverify',
    description: 'Unverifies a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('unverify')
    .setDescription('Unverifies a member in the Roblox Group.')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('What is your Roblox Username?').setRequired(true)
        .setAutocomplete(true)
        ),

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const username = interaction.options.getString('username')
            const id = await noblox.getIdFromUsername(username)
        const rank = await noblox.getRankInGroup(process.env.GroupID, id)
        const role1 = await noblox.getRole(process.env.GroupID, rank)
            await interaction.deferReply({ephemeral: true})
            
            try {
                if (username) {
                 await interaction.editReply({ content: `You have been successfully unverified and your Roles have been removed!` })
                 bot.db.delete(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}`)
                 const member = await interaction.guild.members.fetch(interaction.member.id)
                let findRole = "Verified"
                let findRole2 = role1.name
                const role = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                const role2 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                await member.roles.remove(role.id);
                await member.roles.remove(role2.id);
                } else {
                    await interaction.editReply({ content: `**ERROR** | Failed to unverify your account! Please try again later!`})
                }

            } catch (err) {
                console.log(err.message)
            }
        }
    }
