const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    PermissionsBitField,
} = require('discord.js')
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Delwarns',
    description: 'Delete warnings from a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('delwarns')
    .setDescription('Delete warnings from a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Delete Warnings').setRequired(true)
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
            await interaction.deferReply({ephemeral: true})
            try {
                let user = interaction.guild.members.cache.get(username.id);
                if (interaction.member.user === username) return interaction.editReply(`**ERROR** | You can't Delete warnings from yourself!`)
                    if (bot.user === username) return interaction.editReply(`**ERROR** | You can't Delete warnings from me!`)
                    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.editReply(`**ERROR** | You don't have permission to use this command!`)
                    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.editReply(`**ERROR** | I don't have permission to execute this command!`)
                    if (interaction.member.moderatable) return interaction.editReply(`**ERROR** | I can't Delete ${username} warns because they have higher permission levels over me!`)
                    if (interaction.member.user.bot = username.bot) return interaction.editReply(`**ERROR** | You can't Delete warnings from other Bots!`)
                    if (interaction.member.roles.highest.position < user.roles.highest.position) return interaction.editReply(`**ERROR** | You can't Delete ${username} warnings because they are a Higher Rank than you!`)
              let Warnings = bot.db.get(`userWarnings_${interaction.guild.id}_${username.id}.warnings`)
                if (username && Warnings > 0) {
          bot.db.delete(`userWarnings_${interaction.guild.id}_${username.id}`);
                  
                interaction.editReply({ content: `**${username}** now has 0 **Warnings** in the ${interaction.guild.name} Server!`,
            })
              let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nDelete All Warnings\n**Number of Warnings**\n0\n**Moderator:**`)
                  .setColor('Green')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  interaction.channel.send({ embeds: [embed] })
                  } else {
                interaction.editReply({ content: `Failed to Delete **${username}** Warnings in the ${interaction.guild.name} Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}
