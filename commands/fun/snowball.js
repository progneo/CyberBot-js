const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snowball')
		.setDescription('Throw a snowball at someone.')
		.addUserOption(option => option.setName('member').setDescription('Target Member').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('member');
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle(`${interaction.author.displayName} threw a snowball at the ${member.displayName}`);

		return interaction.reply({ embeds: [embed] });
	},
};
