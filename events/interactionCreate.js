const { Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(chalk.redBright('[ERROR]'), `No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(chalk.redBright('[ERROR]'), `Error executing ${interaction.commandName}`, error);
		}
	},
};