const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getServer } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles_list')
		.setDescription('Get a list of roles.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const server = await getServer(interaction.guildId);
		const roles = await server.getRoles();
		let rolesString = '';
		for (const role of roles) {
			const serverRole = await interaction.guild.roles.fetch(role.role_id);
			rolesString += `**${role.target_level} level** - ${serverRole.name}\n`;
		}

		const embed = {
			author: {
				name: 'List of roles',
				icon_url: interaction.guild.iconURL(),
			},
			description: rolesString,
		};

		return interaction.reply({ embeds: [embed] });
	},
};
