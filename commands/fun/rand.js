const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rand')
		.setDescription('Returns random number.')
		.addIntegerOption(option => option.setName('min').setDescription('Min number (0 if not specified)'))
		.addIntegerOption(option => option.setName('max').setDescription('Max number (100 if not specified)')),
	async execute(interaction) {
		let min = interaction.options.getInteger('min');
		let max = interaction.options.getInteger('max');
		if (!min) {
			min = 0;
		}
		if (!max) {
			max = 100;
		}
		if (max < min) {
			const embed = new EmbedBuilder()
				.setColor('#2f3136')
				.setTitle('Error')
				.setDescription('You have typed wrong range.');
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		return interaction.reply(Math.floor(Math.random() * (max - min) + min).toString());
	},
};
