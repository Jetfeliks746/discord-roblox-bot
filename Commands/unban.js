const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    Guild,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Unban',
    description: 'Unban a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a member in the Discord Server!')
    .addStringOption(option =>
        option.setName('userid')
        .setDescription('Userid to Unban').setRequired(true)
        )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for UnBan')),
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
            const userid = interaction.options.getString('userid')
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
              await interaction.guild.bans.fetch()
            .then(async bans => {
              if (bans.size == 0) return await interaction.editReply({ content: `There aren't any Users to Unban!`});
              let BannedId = bans.find(ban => ban.user.id == userid);
              if (!BannedId) return await interaction.editReply({ content: `ERROR | Can't find User! Did you provide a Valid UserID or is the User Unbanned`});
                if (userid && reason) {
                interaction.guild.bans.remove(userid, reason)
                interaction.editReply({ content: `Successfully Unbanned **<@${userid}>** from the Server!`,
            })
                  let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${(await interaction.guild.bans.fetch(userid)).user.username}\n**Discriminator:**\n${(await interaction.guild.bans.fetch(userid)).user.discriminator}\n**User Tag:**\n${(await interaction.guild.bans.fetch(userid)).user.tag}\n**User Mention:**\n${(await interaction.guild.bans.fetch(userid)).user}\n**UserId:**\n${userid}\n**Moderation Type:**\nUnBan User\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setColor('Green')
                  .setAuthor({ name: (await interaction.guild.bans.fetch(userid)).user.username, iconURL: (await interaction.guild.bans.fetch(userid)).user.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Unban **<@${userid}>** from the Server!`,
        })
        }
              })
            } catch (error) {
                console.log(error.message)
            }
        },
}