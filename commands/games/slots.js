const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { getUser } = require('../../database/dbHelpers.js');

async function slots(interaction) {
	const ch = ['✖', '✖', '✖', '✖', '✖'];
	const slotsEmoji = ['🍇', '🍑', '🍉', '🍒', '🥝', '🥒', '🌶', '🪙', ':seven:'];
	const odds_x3 = [1, 3, 4, 5, 6, 7, 9, 11, 15];
	const odds_x4 = [4, 6, 7, 8, 9, 10, 12, 15, 20];
	const odds_x5 = [10, 12, 13, 14, 15, 16, 20, 50, 100];

	const fruitsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	const bet = interaction.options.getInteger('bet');
	let win = -bet;
	const user = await getUser(interaction.member.id);

	const embed = new EmbedBuilder()
		.setColor(0x2b2d31)
		.setAuthor({
			iconURL: interaction.member.displayAvatarURL(),
			name: 'Slots',
		});


	if (user.balance < bet) {
		embed.setDescription('Not enough money');
		return interaction.editReply({ embeds: [embed], ephemeral: true });
	}

	await user.addBalance(-bet);

	embed.setDescription(`${ch[0]}${ch[1]}${ch[2]}${ch[3]}${ch[4]}`)
		.addFields([
			{
				name: 'Bet',
				value: bet.toString(),
				inline: true,
			},
			{
				name: 'Result',
				value: win.toString(),
				inline: true,
			},
			{
				name: 'Your balance',
				value: user.balance.toString(),
				inline: false,
			},
		]);

	await interaction.editReply({ embeds: [embed] });

	for (let i = 0; i < 5; i++) {
		await new Promise(r => setTimeout(r, 500));
		const randomInt = Math.floor(Math.random() * ((fruitsCount.length - 1) * 12));
		ch[i] = slotsEmoji[Math.round(randomInt / 12)];
		embed.setDescription(`${ch[0]}${ch[1]}${ch[2]}${ch[3]}${ch[4]}`);

		fruitsCount[Math.round(randomInt / 12)] += 1;

		if (fruitsCount[Math.round(randomInt / 12)] === 3) {
			win = bet * odds_x3[Math.round(randomInt / 12)];
		}
		else if (fruitsCount[Math.round(randomInt / 12)] === 4) {
			win = bet * odds_x4[Math.round(randomInt / 12)];
		}
		else if (fruitsCount[Math.round(randomInt / 12)] === 5) {
			win = bet * odds_x5[Math.round(randomInt / 12)];
		}

		embed.setFields([
			{
				name: 'Bet',
				value: bet.toString(),
				inline: true,
			},
			{
				name: 'Result',
				value: win.toString(),
				inline: true,
			},
			{
				name: 'Your balance',
				value: user.balance.toString(),
				inline: false,
			},
		]);

		await interaction.editReply({ embeds: [embed] });
	}

	if (win > 0) {
		await user.addBalance(win);
	}

	embed.setFields([
		{
			name: 'Bet',
			value: bet.toString(),
			inline: true,
		},
		{
			name: 'Result',
			value: win.toString(),
			inline: true,
		},
		{
			name: 'Your balance',
			value: user.balance.toString(),
			inline: false,
		},
	]);

	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('roll')
				.setLabel('Roll')
				.setStyle(ButtonStyle.Secondary),
		);

	return await interaction.editReply({ embeds: [embed], components: [row] });
}

async function createButton(message, interaction) {
	const collector = message.createMessageComponentCollector({
		filter: i => i.user.id === interaction.user.id,
		time: 10000,
	});

	collector.on('collect', async (i) => {
		await i.update({ components: [] });
		await collector.stop();
		const newMessage = await slots(interaction);
		await createButton(newMessage, interaction);
	});

	collector.on('end', async () => await message.edit({ components: [] }));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slots')
		.addIntegerOption(option => option.setName('bet').setDescription('Your bet').setMinValue(10).setRequired(true))
		.setDescription('Slots game.'),
	async execute(interaction) {
		await interaction.deferReply();
		const message = await slots(interaction);
		await createButton(message, interaction);
	},
};
