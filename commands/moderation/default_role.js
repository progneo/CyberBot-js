const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { setDefaultRole } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('default_role')
		.setDescription('Set the default role.')
		.addRoleOption(option => option.setName('role').setDescription('Role').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const role = interaction.options.getRole('role');

		await setDefaultRole(interaction.guild.id, role.id);

		const exampleEmbed = new EmbedBuilder()
			.setTitle(`The role ***${role.name}*** is set by default.`);

		return interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
	},
};
