const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    Guild,
    GuildMember,
    PermissionsBitField,
} = require('discord.js')

const db = require('quick.db');

const { SlashCommandBuilder, userMention } = require('@discordjs/builders')


module.exports = {
    name: 'Warn',
    description: 'Warn a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Warn').setRequired(true)
        )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for Warn')),
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
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
                if (username && reason) {
                  if (interaction.member.user === username) return interaction.editReply(`**ERROR** | You can't Warn yourself!`)
                  if (bot.user === username) return interaction.editReply(`**ERROR** | You can't Warn me!`)
                  if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.editReply(`**ERROR** | You don't have permission to use this command!`)
                  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.editReply(`**ERROR** | I don't have permission to execute this command!`)
                  if (interaction.member.moderatable) return interaction.editReply(`**ERROR** | I can't warn ${username} because they have higher permission levels over me!`)
                  if (interaction.member.user.bot = username.bot) { 
                  await interaction.editReply(`**ERROR** | You can't Warn other Bots!`)
                  } else {
            bot.db.set(`userWarnings_${interaction.guild.id}_${username.id}.userid`, interaction.member.id)
          bot.db.add(`userWarnings_${interaction.guild.id}_${username.id}.warnings`, 1);
          bot.db.push(`userWarnings_${interaction.guild.id}_${username.id}.reasons`, reason);
                interaction.editReply({ content: `Successfully Warned **${username}** in the ${interaction.guild.name} Server!`,
            })
              let embed = new EmbedBuilder()
                  .setColor("Yellow")
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nWarn\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL()})
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  interaction.channel.send({ embeds: [embed] })
                  }} else {
                interaction.editReply({ content: `Failed to Warn **${username}** in the ${interaction.guild.name} Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}