const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    Guild,
    GuildMember,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'DelTimeout',
    description: 'Remove Timeout from a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('deltimeout')
    .setDescription('Remove Timeout from a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Remove Timeout').setRequired(true)
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
            const username = interaction.options.getUser('username')
            let duration = null;
            await interaction.deferReply({ephemeral: true})
                
            try {
              if (username && interaction.options.getMember('username').moderatable && interaction.options.getMember('username').communicationDisabledUntil) {
                let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nRemove Timeout\n**Moderator:**`)
                  .setColor('Green')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                interaction.options.getMember('username').timeout(duration)
                interaction.editReply({ content: `:white_check_mark: **SUCCESS** | Successfully Removed **${username}'s** Timeout in the Server!`,
            })
                  interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `:x: **ERROR** | Failed to Remove **${username}'s** Timeout in the Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}
