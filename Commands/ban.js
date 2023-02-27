const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    PermissionsBitField,
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
                let user = interaction.guild.members.cache.get(username.id);
                console.log(user.roles.highest.position)
                let BannedId = members.find(member => member.user.id == username.id);
                if (!BannedId) return await interaction.editReply({ content: `**ERROR** | Can't find **${username}** in ${interaction.guild.name}`});
                    if (interaction.member.user === username) return interaction.editReply(`**ERROR** | You can't Ban yourself!`)
                    if (bot.user === username) return interaction.editReply(`**ERROR** | You can't Ban me!`)
                    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.editReply(`**ERROR** | You don't have permission to use this command!`)
                    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.editReply(`**ERROR** | I don't have permission to execute this command!`)
                    if (interaction.member.moderatable) return interaction.editReply(`**ERROR** | I can't Ban ${username} because they have higher permission levels over me!`)
                    if (interaction.member.user.bot = username.bot) return interaction.editReply(`**ERROR** | You can't Ban other Bots!`)
                    if (interaction.member.roles.highest.position < user.roles.highest.position) return interaction.editReply(`**ERROR** | You can't Ban ${username} because they are a Higher Rank than you!`)
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
