const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const rbxbot = require('noblox.js');
const { readdirSync } = require('fs')
const express = require('express');
const app = express();
const port = 90;
const pogger = require('pogger');
const colors = require('colors');
const db = require('quick.db');
const ms = require('ms');
const Time = "5m";
var prefix = "!";
require('dotenv').config();
const { parse } = require('path');
const bot = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
bot.db = require('quick.db');
bot.commands = new Map()

const { Player } = require('discord-player');
bot.player = new Player(bot, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    leaveOnEndCooldown: 1000,
    leaveOnEmptyCooldown: 1000,
    autoSelfDeaf: false,
   ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    },
    initialVolume: 100,
    bufferingTimeout: 100,
    spotifyBridge: true,
    disableVolume: false,
    volumeSmoothness: 0.08
})

bot.slashcommands = []



const commands = readdirSync('./Commands').filter(file => 
    file.endsWith('.js')
)

for (command of commands) {
    const file = require(`./Commands/${command}`)
    bot.commands.set(file.name.toLowerCase(), file)
    if (file.data) {
        bot.slashcommands.push(file.data)
    }
}

const events = readdirSync('./Events')

for (const event of events) {
    const file = require(`./Events/${event}`)
    const name = event.split('.')[0]

    bot.on(name, file.execute.bind(null, bot))
}


bot.on('ready', async() => {
    let ids = bot.guilds.cache.map(guild => guild.id).join(", "); 
    //let icons = bot.guilds.cache.map(guild => guild.iconURL()).join(", ");

    await rbxbot.setCookie(process.env.Cookie)
    .then(async(success) => { // Required if the group's shout is private
        console.log(`${await rbxbot.getCurrentUser("UserName")} Logged in.`);
        let avatar = await rbxbot.getPlayerThumbnail(`${await rbxbot.getCurrentUser("UserId")}`, "48x48", "png", true, "headshot");
    let avatarurl = avatar[0].imageUrl;

    bot.db.set(`BotAvatar_${ids}.botavatar`, { avatarurl })
    let getbotavatar = bot.db.get(`BotAvatar_${ids}.botavatar.avatarurl`)
    await bot.user.setAvatar(getbotavatar)
    await bot.user.setUsername(await rbxbot.getCurrentUser("UserName"))
    let group = await rbxbot.getGroup(process.env.GroupID);
    let groupName = group.name;
    console.log(`${bot.user.username} is Running`)
    bot.user.setPresence({ activities: [{ name: groupName, type: Number(process.env.ActivityType) }], status: 'dnd'})
            bot.on('interactionCreate', async interaction => {
                if (!interaction.isAutocomplete()) return;
                
                if (interaction.commandName === 'rank') {
                    if (interaction.options.get('rank')) {
                    const groupInfo = await rbxbot.getGroup(process.env.GroupID)
                    const rank = await rbxbot.getRankInGroup(process.env.GroupID, groupInfo.owner.userId)
                    const ownerrole = await rbxbot.getRole(process.env.GroupID, rank)
                    const groupbot = await rbxbot.getCurrentUser("UserID")
                    const botrank = await rbxbot.getRankInGroup(process.env.GroupID, groupbot)
                    const botrole = await rbxbot.getRole(process.env.GroupID, botrank)
                    const grouproles = await rbxbot.getRoles(process.env.GroupID)
                    values = ["Guest", botrole.name, ownerrole.name]
                    const filtered = grouproles.filter((role) => 
                    !values.includes(role.name)
                    );
                    await interaction.respond(
                        filtered.map(role => ({ name: role.name, value: role.name })),
                    );
                }

                if (interaction.options.get('username')) {
                    const name = await interaction.options.get('username').value
                    fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                    if (r.status != 200) { return; }
                    return r.url.match(/\d+/)[0];
                }).then(async id => {
                    const username = await rbxbot.getUsernameFromId(id)
                    const userId = await rbxbot.getIdFromUsername(username)
                    await interaction.respond([
                        {
                            name: `${username} (${userId})`,
                            value: username
                        }
                    ]);
                }).catch((error) => {
                    return;
                })
                }
            }
            if (interaction.commandName === 'demote') {

            if (interaction.options.get('username')) {
                const name = await interaction.options.get('username').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'promote') {

            if (interaction.options.get('username')) {
                const name = await interaction.options.get('username').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'forceverify') {

            if (interaction.options.get('rblxusername')) {
                const name = await interaction.options.get('rblxusername').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'unforceverify') {

            if (interaction.options.get('rblxusername')) {
                const name = await interaction.options.get('rblxusername').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'unverify') {

            if (interaction.options.get('username')) {
                const name = await interaction.options.get('username').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'verify') {

            if (interaction.options.get('username')) {
                const name = await interaction.options.get('username').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }
        if (interaction.commandName === 'exile') {

            if (interaction.options.get('username')) {
                const name = await interaction.options.get('username').value
                fetch(`https://www.roblox.com/users/profile?username=${name}`).then(r => {if (!r.ok) { return; }
                if (r.status != 200) { return; }
                return r.url.match(/\d+/)[0];
            }).then(async id => {
                const username = await rbxbot.getUsernameFromId(id)
                const userId = await rbxbot.getIdFromUsername(username)
                await interaction.respond([
                    {
                        name: `${username} (${userId})`,
                        value: username
                    }
                ]);
            }).catch((error) => {
                return;
            })
            }
        }

                });

    app.get("/ranker", async(req, res) => {
    var User = req.param("userid");
    var Rank = req.param("rank");
    const username = await rbxbot.getUsernameFromId(User)
    const rank = await rbxbot.getRankInGroup(process.env.GroupID, User)
    const role = await rbxbot.getRole(process.env.GroupID, rank)
    const rolename = await rbxbot.getRole(process.env.GroupID, Number(Rank))
    let group = await rbxbot.getGroup(process.env.GroupID);
    let groupName = group.name;
    let groupOwner = group.owner.username;
    rbxbot.message(User, `${groupName} Rank Change`, `Hello ${username}, Your rank has been Changed in ${groupName} to ${rolename.name} from ${role.name}! If you have any questions please contact ${groupOwner} or the Co-Owners of the Group.`)
    rbxbot.setRank(process.env.GroupID, parseInt(User), parseInt(Rank));
    res.json("Ranked!");
});

app.get("/promote", async(req, res) => {
    var User = req.param("userid");
    const username = await rbxbot.getUsernameFromId(User)
    const rank = await rbxbot.getRankInGroup(process.env.GroupID, User)
    const role = await rbxbot.getRole(process.env.GroupID, rank)
    let newrank = role.rank + 1;
    let newrole = await rbxbot.getRole(process.env.GroupID, newrank)
    let group = await rbxbot.getGroup(process.env.GroupID);
    let groupName = group.name;
    let groupOwner = group.owner.username;
    rbxbot.message(User, `${groupName} Promotion`, `Hello ${username}, You have been Promoted in ${groupName} to ${newrole.name} from ${role.name}! If you have any questions please contact ${groupOwner} or the Co-Owners of the Group.`)
    rbxbot.promote(process.env.GroupID, parseInt(User));
    res.json("Promoted!");
});

app.get("/demote", async(req, res) => {
    var User = req.param("userid");
    const username = await rbxbot.getUsernameFromId(User)
    const rank = await rbxbot.getRankInGroup(process.env.GroupID, User)
    const role = await rbxbot.getRole(process.env.GroupID, rank)
    let newrank = role.rank - 1;
    let newrole = await rbxbot.getRole(process.env.GroupID, newrank)
    let group = await rbxbot.getGroup(process.env.GroupID);
    let groupName = group.name;
    let groupOwner = group.owner.username;
    rbxbot.message(User, `${groupName} Demotion`, `Hello ${username}, You have been Demoted in ${groupName} to ${role.name} from ${newrole.name}! If you have any questions please contact ${groupOwner} or the Co-Owners of the Group.`)
    rbxbot.demote(process.env.GroupID, parseInt(User));
    res.json("Demoted!");
});
      
app.get("/shouts", (req, res) => {
   var Message = req.param("shout");
  
  rbxbot.shout(process.env.GroupID, Message);
  res.json("Shouted!");
});

app.listen(port, () =>
	pogger.success(`[SERVER]`.bgCyan, `Server is Ready!`.green, ` App Listening to: https://localhost:${port}`.blue)
);
       let onShout = rbxbot.onShout(process.env.GroupID);
        onShout.on('data', async function(post) {
            let group = await rbxbot.getGroup(process.env.GroupID);
            let groupName = group.name;
    let avatar = await rbxbot.getPlayerThumbnail(post.poster.userId, "48x48", "png", true, "headshot");
      let avatarurl = avatar[0].imageUrl;
    const shoutchannel = bot.guilds.cache.get(`${ids}`).channels.cache.get(`${process.env.ShoutChannelID}`)
    const embed = new EmbedBuilder()
    .setTitle(`**Group Shout**`)
    .setDescription(`**User**\n${post.poster.username}\n**UserID**\n${post.poster.userId}\n**Shout Message**\n${post.body}\n**Links**\n[Group](https://www.roblox.com/groups/${process.env.GroupID})\n[Profile](https://www.roblox.com/users/${post.poster.userId}/profile)`)
    .setAuthor({ name: post.poster.username, iconURL: avatarurl })
    .setColor(`Green`)
    .setFooter({ text: groupName })
    .setTimestamp(Date.now())
    shoutchannel.send({ embeds: [embed] }, ms(Time))
}); 
 
onShout.on('error', function (err) {
    console.log(err.message);
}, ms(Time));
    })
 
.catch((err) => console.error(err.message)); 

    let currentUser = await rbxbot.getCurrentUser();
  console.log(currentUser.UserName);
}, ms(Time));

  bot.login(process.env.Token)
