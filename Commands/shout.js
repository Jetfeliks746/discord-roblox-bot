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
    name: 'Shout',
    description: 'Send a Shout to the Roblox Group!',
    data: new SlashCommandBuilder()
    .setName('shout')
    .setDescription('Send a Shout to the Roblox Group!')
    .addStringOption(option =>
        option.setName('message')
        .setDescription('Send a Shout message to the Roblox Group!').setRequired(true)
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
            const shoutmessage = interaction.options.getString('message')
            await interaction.deferReply({ephemeral: true})
            try {
              
            console.log()
                noblox.shout(process.env.GroupID, shoutmessage)
                interaction.editReply({ content: `Successfully Posted Shout to the Roblox Group!`,
            })
    let avatar = await noblox.getPlayerThumbnail(`${await noblox.getCurrentUser("UserId")}`, "48x48", "png", true, "headshot");
      let avatarurl = avatar[0].imageUrl;
              let embed = new EmbedBuilder()
                  .setTitle(`**Rank Management!**`)
                  .setDescription(`**Username:**\n${await noblox.getCurrentUser("UserName")}\n**UserId:**\n${await noblox.getCurrentUser("UserId")}\n**Rank Management Type:**\nShout\n**Shout Message:**\n${shoutmessage}\n**Command Used By:**`)
                  .setColor('Green')
                  .setAuthor({ name: `${await noblox.getCurrentUser("UserName")}`, iconURL: avatarurl })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
              interaction.channel.send({ embeds: [embed] })
            } catch (error) {
                interaction.editReply({ content: `Failed to Post Shout to Roblox Group!`,
        })
                console.log(error.message)
            }
        },
}