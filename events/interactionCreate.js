const { Events } = require('discord.js');
const { getServerUser } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await getServerUser(interaction.guildId, interaction.member.user.id);
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`[ERROR] Error executing ${interaction.commandName}`, error);
		}
	},
};