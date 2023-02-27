const {
    Client,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    User,
    Guild,
    Events,
    PermissionsBitField,
} = require('discord.js')

const noblox = require('noblox.js')
require('dotenv').config();
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Verify',
    description: 'Verifies a member in the Roblox Group.',
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifies a member in the Roblox Group.')
    .addStringOption(option =>
        option.setName('username')
        .setDescription('What is your Roblox Username?').setRequired(true)
        .setAutocomplete(true)
        ),

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const username = interaction.options.getString('username')
            const id = await noblox.getIdFromUsername(username)
        const rank = await noblox.getRankInGroup(process.env.GroupID, id)
        const role1 = await noblox.getRole(process.env.GroupID, rank)
            await interaction.deferReply({ephemeral: true})
            function Generate() {
           let tokenID = [];
           let randomstuff = ['0', '2', '3', '4', '5', '6', '7', '8', '9'];
           for (let x = 1; x <= 6; x++) {
           tokenID.push(randomstuff[Math.floor(Math.random() * randomstuff.length)]);
           }
           return tokenID.join(' ');
            }
            const string = Generate()
            try {
                if (username) {
                    let embed = new EmbedBuilder()
                    .setTitle('**Money Devs Verification!**')
                    .setColor('Yellow')
                    .setDescription(`Hello ${username}, To continue with your Roblox Verification. Please enter the following code into your Roblox Status or Bio:\n**${string}**`)
                    .setFooter({ text: `After you've entered your code please come back and click done`, })
                    .setTimestamp(Date.now())
                 interaction.editReply({ embeds: [embed], components: [ new ActionRowBuilder().setComponents( new ButtonBuilder().setCustomId('done').setLabel('done').setStyle(ButtonStyle.Success))]  })
                }

                const filter = i => i.customId === 'done' && i.user.id === interaction.member.id;

const collector = interaction.channel.createMessageComponentCollector(filter, { time: 1500 });


    collector.once('collect', async i => {
        let embed4 = new EmbedBuilder()
                .setTitle('**Money Devs Verification!**')
                .setColor('Yellow')
                .setDescription(`Hello ${username}, You are already Verified!`)
                .setFooter({ text: `You can only verify once!`, })
                .setTimestamp(Date.now())
        let rblx = bot.db.get(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}.robloxusername`);
       if (rblx) return i.reply({ embeds: [embed4], components: []})
        await noblox.getIdFromUsername(username).then(async foundUser => {
            const UserId = foundUser;
        let information = await noblox.getPlayerInfo({userId: UserId})
            if (information.blurb.match(string)) {
                let embed2 = new EmbedBuilder()
                .setTitle('**Money Devs Verification!**')
                .setColor('Green')
                .setDescription(`Hello ${username}, You have been successfully Verified!`)
                .setFooter({ text: `Enjoy your stay!`, })
                .setTimestamp(Date.now())
                await i.reply({ embeds: [embed2], components: [] })
                bot.db.set(`RobloxInfo_${interaction.guild.id}_${interaction.member.id}`, { discordid: interaction.member.id, robloxid: UserId, robloxusername: username })
                let embed3 = new EmbedBuilder()
                .setTitle('**Money Devs Verification!**')
                .setColor('Blue')
                .setDescription(`Hello ${username}, You have been verified but Unable to Update your nickname do to lack of Permissions!`)
                .setFooter({ text: `Enjoy the Server!`, })
                .setTimestamp(Date.now())
                const member = await interaction.guild.members.fetch(interaction.member.id)
                let findRole = "Verified"
                let findRole2 = role1.name
                const role = await interaction.guild.roles.cache.find(r => r.name.includes(findRole))
                const role2 = await interaction.guild.roles.cache.find(r => r.name.includes(findRole2))
                await member.roles.add(role.id);
                await member.roles.add(role2.id);
                if (!interaction.member.manageable) return i.editReply({ embeds: [embed3], components: []})
                interaction.member.setNickname(username)
                setTimeout(() => {
                    i.deleteReply()
                }, 3000)
            } else {
                let embed2 = new EmbedBuilder()
                .setTitle('**Money Devs Verification!**')
                .setColor('Red')
                .setDescription(`Hello ${username}, We were unable to verify your Account!`)
                .setFooter({ text: `Please try again later!`, })
                .setTimestamp(Date.now())
              await i.reply({ embeds: [embed2], components: []})
              setTimeout(() => {
                i.deleteReply()
            }, 3000)
            }
        })
    });

            } catch (err) {
                console.log(err.message)
            }
        }
    }
