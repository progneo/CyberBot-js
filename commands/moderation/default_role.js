const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { addServerRole } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_role')
		.setDescription('Set the default role.')
		.addRoleOption(option => option.setName('role').setDescription('Role').setRequired(true))
		.addIntegerOption(level => level.setName('level').setDescription('Target level').setMinValue(0).setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const level = interaction.options.getInteger('level');

		await addServerRole(interaction.guild.id, role.id, level);

		const exampleEmbed = new EmbedBuilder()
			.setTitle(`The role ***${role.name}*** will be issued when the user reaches level ***${level}***.`);

		return interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
	},
};
