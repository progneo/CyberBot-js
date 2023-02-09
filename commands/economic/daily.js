const { SlashCommandBuilder } = require('discord.js');
const { getUser } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Get a daily bonus.'),
	async execute(interaction) {
		const user = await getUser(interaction.user.id);

		const embed = {
			color: 0x2f3136,
			author: {
				name: 'Daily bonus',
				icon_url: interaction.member.displayAvatarURL(),
			},
		};

		if (!user.last_daily || (user.last_daily.getTime() + 86400000 <= Date.now())) {
			const reward = Math.floor(Math.random() * (500 - 100) + 100);
			embed['description'] = `Today your bonus is equal to: **${reward}**`;
			user.addBalance(reward);
			user.updateDaily();
		}
		else {
			const date = new Date(user.last_daily);
			const dateFormat = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`;
			embed['description'] = 'It has not been 24 hours since you received your previous daily bonus.\n' +
				`Time of receipt of previous bonus: **${dateFormat}**`;
		}

		return interaction.reply({ embeds: [embed] });
	},
};
