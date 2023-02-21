const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { setLevel } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Set the level to the user.')
		.addUserOption(option => option.setName('member').setDescription('Target Member').setRequired(true))
		.addIntegerOption(option => option.setName('level').setDescription('Level').setMinValue(0).setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		await interaction.deferReply();

		const level = interaction.options.getInteger('level');
		const member = interaction.options.getUser('member');
		await setLevel(member.id, interaction.guildId, level);

		const embed = {
			color: 0x2b2d31,
			author: {
				name: `Now ${member.username} has level ${level}`,
				icon_url: member.displayAvatarURL(),
			},
		};

		return interaction.editReply({ embeds: [embed] });
	},
};
