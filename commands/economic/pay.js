const { SlashCommandBuilder } = require('discord.js');
const { transferBalance } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('Transfer money to another member.')
		.addUserOption(option => option.setName('member').setDescription('Target Member').setRequired(true))
		.addIntegerOption(option => option.setName('amount').setDescription('Transfer amount.').setRequired(true).setMinValue(1)),
	async execute(interaction) {
		const sender = interaction.user;
		const target = interaction.options.getUser('member');
		const amount = interaction.options.getInteger('amount');

		await interaction.deferReply();

		const result = await transferBalance(sender.id, target.id, amount);

		console.log(target);
		const embed = {
			color: 0x2b2d31,
			author: {
				name: 'Money transfer',
				icon_url: sender.displayAvatarURL(),
			},
		};
		if (!result) {
			embed['description'] = 'There is not enough money in your account';
		}
		else {
			embed['description'] = `**${amount}** have been transferred to **${target.username}**`;
		}

		return interaction.editReply({ embeds: [embed] });
	},
};
