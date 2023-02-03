const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Shows information about server: count of members, owner, etc.'),
	async execute(interaction) {
		const guild = interaction.guild;
		const owner = await guild.fetchOwner();
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle(`Information about ${guild.name}`)
			.setThumbnail(guild.iconURL())
			.addFields(
				{ name: 'Statistics:', value: `Members: ${guild.memberCount}\nChannels: ${guild.channels.cache.size}` },
				{ name: 'Owner:', value: `${owner.user.tag}` },
				{ name: 'Created at:', value: guild.createdAt.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } ) },
			);
		return interaction.reply({ embeds: [embed] });
	},
};
