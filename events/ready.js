require('dotenv').config();
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}\nID: ${client.user.id}`);
		client.user.setStatus(process.env.bot_status);
		client.user.setActivity(process.env.bot_activity, { type: 5 });
	},
};