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
    name: 'Forceverify',
    description: 'Force Verifies a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('forceverify')
    .setDescription('Force Verifies a member in the Roblox Group.')
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
                    .setColor('Yellow')
                    .setDescription(`Hello ${username}, They are already Verified!`)
                    .setFooter({ text: `They can only verify once!`, })
                    .setTimestamp(Date.now())
            let rblx = bot.db.get(`RobloxInfo_${interaction.guild.id}_${member.id}.robloxusername`);
            let rblxid = bot.db.get(`RobloxInfo_${interaction.guild.id}_${member.id}.robloxid`);
                if (rblx) return interaction.editReply({ embeds: [embed4]})
                 bot.db.set(`RobloxInfo_${interaction.guild.id}_${member.id}`, { discordid: member.id, robloxid: id, robloxusername: username })
                 let embed3 = new EmbedBuilder()
                 .setTitle('**Money Devs Verification!**')
                 .setColor('Blue')
                 .setDescription(`Hello ${username}, They have been verified but Unable to Update their nickname do to lack of Permissions!`)
                 .setFooter({ text: `Enjoy the Server!`, })
                 .setTimestamp(Date.now())
                 let findRole = "Verified"
                 let findRole2 = role1.name
                 const role = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                 const role2 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                 await member.roles.add(role.id);
                 await member.roles.add(role2.id);
                 if (!member.manageable) return interaction.editReply({ embeds: [embed3]})
                 member.setNickname(username)
                 setTimeout(() => {
                     interaction.deleteReply()
                 }, 3000)
                 interaction.editReply({ content: `**SUCCESS** | You have successfully force verified ${username}` })
                } 

            } catch (err) {
                console.log(err.message)
            }
        }
    }
