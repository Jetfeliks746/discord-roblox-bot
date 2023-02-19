const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const noblox = require('noblox.js')
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Exile',
    description: 'Exile a member from the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('exile')
    .setDescription('Exile a member from the Roblox Group.')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('User to Exile').setRequired(true)
        .setAutocomplete(true)
        )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for Exile')
        ),
        /**
         * 
         * @param {Client} bot
         * @param {Message} message
         * @param {String[]} args
         */
        async execute(bot, message, args) {},

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            let ids = bot.guilds.cache.map(guild => guild.id).join(", "); 
            const username = interaction.options.getString('username')
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            const exilechannel = await bot.guilds.cache.get(ids).channels.cache.get(process.env.LogChannelID)
            let userinfo = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxid`)
            await interaction.deferReply({ephemeral: true})
            try {
                const id = await noblox.getIdFromUsername(username)
                const rank = await noblox.getRankInGroup(process.env.GroupID, id)
                const role = await noblox.getRole(process.env.GroupID, rank)
                const groupbot = await noblox.getCurrentUser("UserID")
                const botrank = await noblox.getRankInGroup(process.env.GroupID, groupbot)
                const botrole = await noblox.getRole(process.env.GroupID, botrank)
                const MaxRankforExiling = botrole.rank - 2;
                let group = await noblox.getGroup(process.env.GroupID);
                let groupName = group.name;
                let groupOwner = group.owner.username;
                let avatar = await noblox.getPlayerThumbnail(id, "48x48", "png", true, "headshot");
      let avatarurl = avatar[0].imageUrl;
                const embed = new EmbedBuilder()
                .setTitle(`**User Exile!**`)
                .setDescription(`**User**\n${username}\n**UserID**\n${id}\n**Exile Reason**\n${reason}\n**Links**\n[Group](https://www.roblox.com/groups/${process.env.GroupID})\n[Profile](https://www.roblox.com/users/${id}/profile)\n**Moderator:**`)
                .setColor('Red')
                .setAuthor({ name: username, iconURL: avatarurl })
                .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                .setTimestamp(Date.now())
              let embed2 = new EmbedBuilder()
                  .setTitle(`**Rank Management!**`)
                  .setDescription(`**Username:**\n${username}\n**UserId:**\n${id}\n**Rank Management Type:**\nKick from Roblox Group\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setColor('Red')
                  .setAuthor({ name: username, iconURL: avatarurl })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                if ((role.rank) >= MaxRankforExiling && !(username.id === userinfo)) {
                noblox.message(id, `${groupName} Exile`, `Hello ${username}, You have been Exiled in ${groupName} for ${reason}! If you have any questions please contact ${groupOwner} or Co-Owners of the Group.`)
                noblox.exile(process.env.GroupID, id)
                console.log(`${username} was Exiled for ${reason}`)
                interaction.editReply({ content: `Successfully Exiled **${username}** from the Roblox Group!`,
            })
                interaction.channel.send({ embeds: [embed2] })
                exilechannel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Exile **${username}** from the Roblox Group!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}
