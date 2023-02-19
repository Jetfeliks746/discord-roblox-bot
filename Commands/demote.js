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
    name: 'Demote',
    description: 'Demote a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('demote')
    .setDescription('Demote a member in the Roblox Group.')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('User to Demote').setRequired(true)
        .setAutocomplete(true)
        ),

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const username = interaction.options.getString('username')
            let userinfo = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxid`)
            console.log(userinfo)
            await interaction.deferReply({ephemeral: true})
            try {
                const id = await noblox.getIdFromUsername(username)
                let userinfo = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxid`)
                const rank = await noblox.getRankInGroup(process.env.GroupID, id)
                const role = await noblox.getRole(process.env.GroupID, rank)
                let newrank = role.rank - 1;
                let newrole = await noblox.getRole(process.env.GroupID, newrank)
                const groupbot = await noblox.getCurrentUser("UserID")
                const botrank = await noblox.getRankInGroup(process.env.GroupID, groupbot)
                const botrole = await noblox.getRole(process.env.GroupID, botrank)
                const MaxRankbelowBot = botrole.rank - 1;
                let users = (await interaction.guild.members.fetch())
            let member_ids = users.map(m => m.user.id);
            member_ids.forEach(consoleItem)
            async function consoleItem(item, index, arr) {
                let users = bot.db.get(`RobloxInfo_${interaction.guild.id}_${item}.robloxusername`)
                let members = bot.db.get(`RobloxInfo_${interaction.guild.id}_${item}.discordid`)
                if (username == users) {
                console.log(members)
                const person = await interaction.guild.members.fetch(members)
                let findRole = newrole.name
                let findRole2 = role.name
                const role3 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                const role4 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                if (!(id === userinfo)){
                await person.roles.add(role3.id);
                await person.roles.remove(role4.id);
                }
                }
            }
                let group = await noblox.getGroup(process.env.GroupID);
                let groupName = group.name;
                let groupOwner = group.owner.username;
              let avatar = await noblox.getPlayerThumbnail(id, "48x48", "png", true, "headshot");
      let avatarurl = avatar[0].imageUrl;
                if ((role.rank) > 1 && (role.rank) <= MaxRankbelowBot && !(id === userinfo)) {
                  let embed = new EmbedBuilder()
                  .setTitle(`**Rank Management!**`)
                  .setDescription(`**Username:**\n${username}\n**UserId:**\n${id}\n**Rank Management Type:**\nDemote\n**New Rank:**\n${newrole.name}\n**Command Used By:**`)
                  .setColor('Red')
                  .setAuthor({ name: username, iconURL: avatarurl })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  noblox.message(id, `${groupName} Demotion`, `Hello ${username}, You have been Demoted in ${groupName} to ${newrole.name} from ${role.name}! If you have any questions please contact ${groupOwner} or the Co-Owners of the Group.`)
                noblox.demote(process.env.GroupID, id)
                interaction.editReply({ content: `Successfully Demoted **${username}**`,
            })
                  interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Demote **${username}**`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}
