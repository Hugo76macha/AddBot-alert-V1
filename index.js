require("http").createServer((req, res) => res.end("Bot est en ligne")).listen(process.env.PORT || 8080);
require('dotenv').config();

const config = require("./config.json");
const { Client, Intents, MessageEmbed } = require("discord.js");
const moment = require("moment");


const client = new Client({
    shards: 'auto',
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
        activities: [{ name: `les bots 🔧`, type: "WATCHING" }],
        status: "online"
    }
});


client.logger = (data) => {
    const timestamp = moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS");
    const logPrefix = `[Sans Logs] | ${timestamp} [::]`;

    if (typeof data === "string") {
        console.log(`${logPrefix} ${data.split("\n").map(d => d.green).join(`\n${logPrefix} `)}`);
    } else if (typeof data === "object") {
        console.log(`${logPrefix} ${JSON.stringify(data, null, 2).green}`);
    } else {
        console.log(`${logPrefix} ${String(data).cyan}`);
    }
};


const createGuildEmbed = (guild, action) => {
    const colors = {
        join: 'BLUE',
        leave: 'RED'
    };

    const timestamp = Math.round(Date.now() / 1000);

    return new MessageEmbed()
        .setTitle(action === 'join' ? '🎉︱Nouveau Serveur' : '❌︱Serveur Quitte')
        .setDescription(
            `Le bot a ${action === 'join' ? 'été ajouté à' : 'quitté'} **${guild.name}** !\n\n` +
            `Total des serveurs : **${client.guilds.cache.size}**\n` +
            `Nombre de membres dans le serveur : **${guild.memberCount}**\n` +
            `Serveur ${action === 'join' ? 'rejoint il y a' : 'quitté le'} : <t:${timestamp}:R>`
        )
        .setColor(colors[action])
        .setTimestamp();
};


client.on("guildCreate", (guild) => {
    try {
        const channel = client.channels.cache.get(config.Channels);
        if (!channel) {
            client.logger(`Channel ${config.Channels} introuvable lors de l'ajout du serveur.`);
            return;
        }

        const embed = createGuildEmbed(guild, 'join');
        channel.send({ embeds: [embed] });

    } catch (err) {
        client.logger(`Erreur dans l'événement 'guildCreate': ${err.message}`);
    }
});


client.on("guildDelete", (guild) => {
    try {
        const channel = client.channels.cache.get(config.Channels);
        if (!channel) {
            client.logger(`Channel ${config.Channels} introuvable lors du départ du serveur.`);
            return;
        }

        const embed = createGuildEmbed(guild, 'leave');
        channel.send({ embeds: [embed] });

    } catch (err) {
        client.logger(`Erreur dans l'événement 'guildDelete': ${err.message}`);
    }
});


client.login(config.token).then(() => {
    client.logger("Le bot est bien allumé et prêt à fonctionner !");
    console.log("Le Bot est en ligne et prêt !");
}).catch((err) => {
    client.logger(`Erreur lors de la connexion du bot: ${err.message}`);
});


const handleError = (type, ...args) => {
    client.logger(`[antiCrash] :: [${type}] ${args.map(arg => JSON.stringify(arg)).join(', ')}`);
};

process.on('multipleResolves', (type, promise, reason) => handleError('multipleResolves', type, promise, reason));
process.on('unhandledRejection', (reason, promise) => handleError('unhandledRejection', reason, promise));
process.on("uncaughtException", (err, origin) => handleError('uncaughtException', err, origin));
process.on('uncaughtExceptionMonitor', (err, origin) => handleError('uncaughtExceptionMonitor', err, origin));
