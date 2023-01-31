const { Events } = require('discord.js');
const { bot_status, bot_activity } = require('../config.json');
const chalk = require('chalk');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(chalk.greenBright('[OK]'), `Ready! Logged in as ${client.user.tag}\nID: ${client.user.id}`);
		client.user.setStatus(bot_status);
		client.user.setActivity(bot_activity, { type: 5 });
	},
};