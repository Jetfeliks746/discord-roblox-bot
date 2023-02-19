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
    name: 'Purge',
    description: 'Purge Messages in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge Messages in the Discord Server!')
    .addIntegerOption(option =>
        option.setName('value')
        .setDescription(`Number of Messages to Purge over 3 and less than 100 messages and can't be older than 14 days!`).setRequired(true)
        )
      .addStringOption(option =>
        option.setName('reason')
          .setDescription(`Reason for Purging Messages`)
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
            const value = interaction.options.getInteger('value')
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
               ;(await interaction.channel.messages.fetch({ limit: 1, before: interaction.channel.lastMessageId})).find(message => {
                 if (value){
                 if (value <= 3) return interaction.editReply(`You can delete ${value} without this command!`)
                  if (value > 100) return interaction.editReply(`You can't Purge ${value} messages due to Discord's Bulk delete limits!`)
                 } interaction.channel.bulkDelete(value, true).then(messages => {
                      if (value) {
                   if (messages) {
                     
                     let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Moderation Type:**\nPurge Messages\n**Number of Deleted Messages:**\n${messages.size}\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setColor('Purple')
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                     if (value > messages.size && messages.size > 1) return interaction.editReply({content: `:warning: **WARNING** | Only **${messages.size}** messages were deleted because the other messages are older than **14** Days!`}) &&  interaction.channel.send({ embeds: [embed] })
                   if ((new Date().getTime() - message.createdAt.getTime() > 1209600000) && value > messages.size && messages.size == 0) return interaction.editReply({content: `:x: **ERROR** | **No** Messages were deleted because the messages you tried to delete are older than **14** Days!`})

                     
                     //if (message.createdAt.getTime() == new Date().getTime()) return interaction.editReply({content: `error`})
                       interaction.editReply({content: `:white_check_mark: **SUCCESS** | Successfully Purged **${messages.size}** messages from the Server!`,
        })
                     interaction.channel.send({ embeds: [embed] })
                    
                   }
                } else {
                  interaction.editReply({ content: `Failed to Purge **${messages.size}** messages from the Server!`,
        })
                }
                 }
                   );
               
               }
                 )
                
            } catch (error) {
                console.log(error.message)
            }
        },
}