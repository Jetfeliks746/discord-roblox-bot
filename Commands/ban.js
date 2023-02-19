const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Ban',
    description: 'Ban a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Ban').setRequired(true)
        )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for Ban')),
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
            const username = interaction.options.getUser('username')
            let reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
              await interaction.guild.members.fetch()
            .then(async members => {
              let BannedId = members.find(member => member.user.id == username.id);
              if (!BannedId) return await interaction.editReply({ content: `ERROR | Can't find **${username}** in ${interaction.guild.name}`});
              if (!BannedId.bannable) return await interaction.editReply({ content: `Failed to Ban **${username}** from the Server!`,
        })
                if (username && reason) {
                  let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nBan User\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setColor('Red')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
               BannedId.ban({ reason: reason })
                interaction.editReply({ content: `Successfully Banned **${username}** from the Server!`,
            })
                  interaction.channel.send({ embeds: [embed] })
        }
              })
            } catch (error) {
                console.log(error.message)
            }
        },
}