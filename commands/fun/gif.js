const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Sends a random gif!')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'Air kiss', value: 'airkiss' },
					{ name: 'Celebrate', value: 'celebrate' },
					{ name: 'Clap', value: 'clap' },
					{ name: 'Confused', value: 'confused' },
					{ name: 'Cry', value: 'cry' },
					{ name: 'Evil laugh', value: 'evillaugh' },
					{ name: 'Hug', value: 'hug' },
					{ name: 'Kiss', value: 'kiss' },
					{ name: 'Laugh', value: 'laugh' },
					{ name: 'Love', value: 'love' },
					{ name: 'Nervous', value: 'nervous' },
					{ name: 'No', value: 'no' },
					{ name: 'Pat', value: 'pat' },
					{ name: 'Peek', value: 'peek' },
					{ name: 'Sad', value: 'sad' },
					{ name: 'Scared', value: 'scared' },
					{ name: 'Shy', value: 'shy' },
					{ name: 'Slow clap', value: 'slowclap' },
					{ name: 'Smile', value: 'smile' },
					{ name: 'Sorry', value: 'sorry' },
					{ name: 'Surprised', value: 'surprised' },
					{ name: 'Tired', value: 'tired' },
					{ name: 'Wink', value: 'wink' },
					{ name: 'Yay', value: 'yay' },
					{ name: 'Yes', value: 'yes' },
				)),
	async execute(interaction) {
		const category = interaction.options.getString('category');
		const result = await axios.get(`https://api.otakugifs.xyz/gif?reaction=kiss&format=${category}`);
		await interaction.reply({ content: result.data['url'], ephemeral: false });
	},
};
