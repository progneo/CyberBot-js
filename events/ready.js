const { Events } = require('discord.js');
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}\nID: ${client.user.id}`);
		client.user.setStatus('dnd');
		client.user.setActivity('dev', { type: 5 });
	},
};