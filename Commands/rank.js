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
    name: 'Rank',
    description: 'Rank a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Rank a member in the Roblox Group.')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('User to Rank').setRequired(true)
        .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('rank')
            .setDescription('Rank a Member').setRequired(true)
            .setAutocomplete(true)
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
            const username = interaction.options.getString('username')
            const ranks = interaction.options.getString('rank')
            let userinfo = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxid`)
            let currentuser = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxusername`)
            const currentuserid = await noblox.getIdFromUsername(currentuser)
                const currentuserrank = await noblox.getRankInGroup(process.env.GroupID, currentuserid)
                const currentuserrole = await noblox.getRole(process.env.GroupID, currentuserrank)
                const userrunningcommand = currentuserrole.rank - 1;
                const getRole = await noblox.getRole(process.env.GroupID, ranks)
            await interaction.deferReply({ephemeral: true})
            try {
                const id = await noblox.getIdFromUsername(username)
                const rank = await noblox.getRankInGroup(process.env.GroupID, id)
                const role = await noblox.getRole(process.env.GroupID, rank)
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
                if (username == users && !(id === userinfo) && (getRole.rank) <= userrunningcommand && (getRole.rank) >= 1) {
                const person = await interaction.guild.members.fetch(members)
                    let findRole = ranks
                    let findRole2 = role.name
                    const role3 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                    const role4 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                await person.roles.add(role3.id);
                await person.roles.remove(role4.id);
                }
            }

                let group = await noblox.getGroup(process.env.GroupID);
                let groupName = group.name;
                let groupOwner = group.owner.username;
              let avatar = await noblox.getPlayerThumbnail(id, "48x48", "png", true, "headshot");
      let avatarurl = avatar[0].imageUrl;
                if ((role.rank) <= MaxRankbelowBot && (role.rank) >= 1 && (getRole.rank) <= userrunningcommand && (getRole.rank) >= 1 && !(id === userinfo)) {
                  let embed = new EmbedBuilder()
                  .setTitle(`**Rank Management!**`)
                  .setDescription(`**Username:**\n${username}\n**UserId:**\n${id}\n**Rank Management Type:**\nSet Rank\n**New Rank:**\n${ranks}\n**Command Used By:**`)
                  .setColor('Green')
                  .setAuthor({ name: username, iconURL: avatarurl })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  noblox.message(id, `${groupName} Rank Change`, `Hello ${username}, Your rank has been Changed in ${groupName} to ${ranks} from ${role.name}! If you have any questions please contact ${groupOwner} or the Co-Owners of the Group.`)
                noblox.setRank(process.env.GroupID, id, ranks)
                interaction.editReply({ content: `Successfully Ranked **${username}** to **${ranks}**`,
            })
                  interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Rank **${username}** to **${ranks}**`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}
