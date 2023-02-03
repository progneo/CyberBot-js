const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('member').setDescription('Target Member')),
	async execute(interaction) {
		let member = interaction.options.getUser('member');
		if (!member) {
			member = interaction.member;
		}
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle(`Avatar of ${member.displayName}`)
			.setImage(interaction.user.displayAvatarURL({ size: 1024, dynamic: true }));

		return interaction.reply({ embeds: [embed] });
	},
};
