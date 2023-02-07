const { SlashCommandBuilder } = require('discord.js');
const { getUser } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Get your balance, or the balance of another user.')
		.addUserOption(option => option.setName('member').setDescription('Target Member')),
	async execute(interaction) {
		let member = interaction.options.getUser('member');
		if (!member) {
			member = interaction.member;
		}
		let name = member.displayName;
		if (!name) {
			name = member.username;
		}
		const user = await getUser(member.id);
		const embed = {
			color: 0x2f3136,
			author: {
				name: `Balance of ${name}: ${user.balance}`,
				icon_url: member.displayAvatarURL(),
			},
		};

		return interaction.reply({ embeds: [embed] });
	},
};
