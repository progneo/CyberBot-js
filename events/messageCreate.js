const { Events } = require('discord.js');
const { addExperience } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;

		const experience = Math.floor(Math.random() * (3 - 1) + 1);
		await addExperience(message.author.id, message.guildId, experience);
	},
};