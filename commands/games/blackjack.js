// noinspection JSCheckFunctionSignatures

const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { getUser } = require('../../database/dbHelpers.js');

class Session {
	constructor() {
		this.cards = [
			{ 'points': 2, 'card': '<:52:784047848546893845>', 'name': 'two' },
			{ 'points': 2, 'card': '<:51:784047849297936404>', 'name': 'two' },
			{ 'points': 2, 'card': '<:50:784047848945745930>', 'name': 'two' },
			{ 'points': 2, 'card': '<:49:784047848798289921>', 'name': 'two' },
			{ 'points': 3, 'card': '<:48:784047848907735060>', 'name': 'three' },
			{ 'points': 3, 'card': '<:47:784047849402269706>', 'name': 'three' },
			{ 'points': 3, 'card': '<:46:784047848907603998>', 'name': 'three' },
			{ 'points': 3, 'card': '<:45:784047849289285642>', 'name': 'three' },
			{ 'points': 4, 'card': '<:44:784047848995946507>', 'name': 'four' },
			{ 'points': 4, 'card': '<:43:784047849259401236>', 'name': 'four' },
			{ 'points': 4, 'card': '<:42:784047848621735958>', 'name': 'four' },
			{ 'points': 4, 'card': '<:41:784047848668528670>', 'name': 'four' },
			{ 'points': 5, 'card': '<:40:784047848118550569>', 'name': 'five' },
			{ 'points': 5, 'card': '<:39:784047847967817780>', 'name': 'five' },
			{ 'points': 5, 'card': '<:38:784047848202960967>', 'name': 'five' },
			{ 'points': 5, 'card': '<:37:784047848341504000>', 'name': 'five' },
			{ 'points': 6, 'card': '<:1_:783592377553780737>', 'name': 'six' },
			{ 'points': 6, 'card': '<:2_:783592377695862824>', 'name': 'six' },
			{ 'points': 6, 'card': '<:3_:783592377860227113>', 'name': 'six' },
			{ 'points': 6, 'card': '<:4_:783592377561382913>', 'name': 'six' },
			{ 'points': 7, 'card': '<:5_:783592378018824192>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:6_:783592378703020075>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:7_:783592379273576458>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:8_:783592380497395723>', 'name': 'seven' },
			{ 'points': 8, 'card': '<:9_:783592379625504798>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:10:783592380267364382>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:11:783592379457208330>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:12:783592380514435092>', 'name': 'eight' },
			{ 'points': 9, 'card': '<:13:783592379335835720>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:14:783592380501721099>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:15:783592379420639312>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:16:783592380266709023>', 'name': 'nine' },
			{ 'points': 10, 'card': '<:17:783592379713060864>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:18:783592380737257473>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:19:783592379533754369>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:20:783592380774612993>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:21:783592380644458507>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:22:783592380582461460>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:23:783592380266709032>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:24:783592380698722314>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:25:783592380087402537>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:26:783592380439330837>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:27:783592380859154432>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:28:783592380812361738>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:29:783602644707049503>', 'name': 'king' },
			{ 'points': 10, 'card': '<:30:783602644731953172>', 'name': 'king' },
			{ 'points': 10, 'card': '<:31:783602644950319135>', 'name': 'king' },
			{ 'points': 10, 'card': '<:32:783602644786610210>', 'name': 'king' },
			{ 'points': 1, 'card': '<:33:783602644983349259>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:34:783602645238546452>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:35:783602645054128128>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:36:783602644999995441>', 'name': 'ace' },
			{ 'points': 2, 'card': '<:52:784047848546893845>', 'name': 'two' },
			{ 'points': 2, 'card': '<:51:784047849297936404>', 'name': 'two' },
			{ 'points': 2, 'card': '<:50:784047848945745930>', 'name': 'two' },
			{ 'points': 2, 'card': '<:49:784047848798289921>', 'name': 'two' },
			{ 'points': 3, 'card': '<:48:784047848907735060>', 'name': 'three' },
			{ 'points': 3, 'card': '<:47:784047849402269706>', 'name': 'three' },
			{ 'points': 3, 'card': '<:46:784047848907603998>', 'name': 'three' },
			{ 'points': 3, 'card': '<:45:784047849289285642>', 'name': 'three' },
			{ 'points': 4, 'card': '<:44:784047848995946507>', 'name': 'four' },
			{ 'points': 4, 'card': '<:43:784047849259401236>', 'name': 'four' },
			{ 'points': 4, 'card': '<:42:784047848621735958>', 'name': 'four' },
			{ 'points': 4, 'card': '<:41:784047848668528670>', 'name': 'four' },
			{ 'points': 5, 'card': '<:40:784047848118550569>', 'name': 'five' },
			{ 'points': 5, 'card': '<:39:784047847967817780>', 'name': 'five' },
			{ 'points': 5, 'card': '<:38:784047848202960967>', 'name': 'five' },
			{ 'points': 5, 'card': '<:37:784047848341504000>', 'name': 'five' },
			{ 'points': 6, 'card': '<:1_:783592377553780737>', 'name': 'six' },
			{ 'points': 6, 'card': '<:2_:783592377695862824>', 'name': 'six' },
			{ 'points': 6, 'card': '<:3_:783592377860227113>', 'name': 'six' },
			{ 'points': 6, 'card': '<:4_:783592377561382913>', 'name': 'six' },
			{ 'points': 7, 'card': '<:5_:783592378018824192>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:6_:783592378703020075>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:7_:783592379273576458>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:8_:783592380497395723>', 'name': 'seven' },
			{ 'points': 8, 'card': '<:9_:783592379625504798>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:10:783592380267364382>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:11:783592379457208330>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:12:783592380514435092>', 'name': 'eight' },
			{ 'points': 9, 'card': '<:13:783592379335835720>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:14:783592380501721099>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:15:783592379420639312>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:16:783592380266709023>', 'name': 'nine' },
			{ 'points': 10, 'card': '<:17:783592379713060864>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:18:783592380737257473>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:19:783592379533754369>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:20:783592380774612993>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:21:783592380644458507>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:22:783592380582461460>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:23:783592380266709032>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:24:783592380698722314>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:25:783592380087402537>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:26:783592380439330837>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:27:783592380859154432>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:28:783592380812361738>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:29:783602644707049503>', 'name': 'king' },
			{ 'points': 10, 'card': '<:30:783602644731953172>', 'name': 'king' },
			{ 'points': 10, 'card': '<:31:783602644950319135>', 'name': 'king' },
			{ 'points': 10, 'card': '<:32:783602644786610210>', 'name': 'king' },
			{ 'points': 1, 'card': '<:33:783602644983349259>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:34:783602645238546452>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:35:783602645054128128>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:36:783602644999995441>', 'name': 'ace' },
			{ 'points': 2, 'card': '<:52:784047848546893845>', 'name': 'two' },
			{ 'points': 2, 'card': '<:51:784047849297936404>', 'name': 'two' },
			{ 'points': 2, 'card': '<:50:784047848945745930>', 'name': 'two' },
			{ 'points': 2, 'card': '<:49:784047848798289921>', 'name': 'two' },
			{ 'points': 3, 'card': '<:48:784047848907735060>', 'name': 'three' },
			{ 'points': 3, 'card': '<:47:784047849402269706>', 'name': 'three' },
			{ 'points': 3, 'card': '<:46:784047848907603998>', 'name': 'three' },
			{ 'points': 3, 'card': '<:45:784047849289285642>', 'name': 'three' },
			{ 'points': 4, 'card': '<:44:784047848995946507>', 'name': 'four' },
			{ 'points': 4, 'card': '<:43:784047849259401236>', 'name': 'four' },
			{ 'points': 4, 'card': '<:42:784047848621735958>', 'name': 'four' },
			{ 'points': 4, 'card': '<:41:784047848668528670>', 'name': 'four' },
			{ 'points': 5, 'card': '<:40:784047848118550569>', 'name': 'five' },
			{ 'points': 5, 'card': '<:39:784047847967817780>', 'name': 'five' },
			{ 'points': 5, 'card': '<:38:784047848202960967>', 'name': 'five' },
			{ 'points': 5, 'card': '<:37:784047848341504000>', 'name': 'five' },
			{ 'points': 6, 'card': '<:1_:783592377553780737>', 'name': 'six' },
			{ 'points': 6, 'card': '<:2_:783592377695862824>', 'name': 'six' },
			{ 'points': 6, 'card': '<:3_:783592377860227113>', 'name': 'six' },
			{ 'points': 6, 'card': '<:4_:783592377561382913>', 'name': 'six' },
			{ 'points': 7, 'card': '<:5_:783592378018824192>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:6_:783592378703020075>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:7_:783592379273576458>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:8_:783592380497395723>', 'name': 'seven' },
			{ 'points': 8, 'card': '<:9_:783592379625504798>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:10:783592380267364382>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:11:783592379457208330>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:12:783592380514435092>', 'name': 'eight' },
			{ 'points': 9, 'card': '<:13:783592379335835720>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:14:783592380501721099>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:15:783592379420639312>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:16:783592380266709023>', 'name': 'nine' },
			{ 'points': 10, 'card': '<:17:783592379713060864>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:18:783592380737257473>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:19:783592379533754369>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:20:783592380774612993>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:21:783592380644458507>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:22:783592380582461460>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:23:783592380266709032>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:24:783592380698722314>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:25:783592380087402537>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:26:783592380439330837>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:27:783592380859154432>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:28:783592380812361738>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:29:783602644707049503>', 'name': 'king' },
			{ 'points': 10, 'card': '<:30:783602644731953172>', 'name': 'king' },
			{ 'points': 10, 'card': '<:31:783602644950319135>', 'name': 'king' },
			{ 'points': 10, 'card': '<:32:783602644786610210>', 'name': 'king' },
			{ 'points': 1, 'card': '<:33:783602644983349259>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:34:783602645238546452>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:35:783602645054128128>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:36:783602644999995441>', 'name': 'ace' },
			{ 'points': 2, 'card': '<:52:784047848546893845>', 'name': 'two' },
			{ 'points': 2, 'card': '<:51:784047849297936404>', 'name': 'two' },
			{ 'points': 2, 'card': '<:50:784047848945745930>', 'name': 'two' },
			{ 'points': 2, 'card': '<:49:784047848798289921>', 'name': 'two' },
			{ 'points': 3, 'card': '<:48:784047848907735060>', 'name': 'three' },
			{ 'points': 3, 'card': '<:47:784047849402269706>', 'name': 'three' },
			{ 'points': 3, 'card': '<:46:784047848907603998>', 'name': 'three' },
			{ 'points': 3, 'card': '<:45:784047849289285642>', 'name': 'three' },
			{ 'points': 4, 'card': '<:44:784047848995946507>', 'name': 'four' },
			{ 'points': 4, 'card': '<:43:784047849259401236>', 'name': 'four' },
			{ 'points': 4, 'card': '<:42:784047848621735958>', 'name': 'four' },
			{ 'points': 4, 'card': '<:41:784047848668528670>', 'name': 'four' },
			{ 'points': 5, 'card': '<:40:784047848118550569>', 'name': 'five' },
			{ 'points': 5, 'card': '<:39:784047847967817780>', 'name': 'five' },
			{ 'points': 5, 'card': '<:38:784047848202960967>', 'name': 'five' },
			{ 'points': 5, 'card': '<:37:784047848341504000>', 'name': 'five' },
			{ 'points': 6, 'card': '<:1_:783592377553780737>', 'name': 'six' },
			{ 'points': 6, 'card': '<:2_:783592377695862824>', 'name': 'six' },
			{ 'points': 6, 'card': '<:3_:783592377860227113>', 'name': 'six' },
			{ 'points': 6, 'card': '<:4_:783592377561382913>', 'name': 'six' },
			{ 'points': 7, 'card': '<:5_:783592378018824192>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:6_:783592378703020075>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:7_:783592379273576458>', 'name': 'seven' },
			{ 'points': 7, 'card': '<:8_:783592380497395723>', 'name': 'seven' },
			{ 'points': 8, 'card': '<:9_:783592379625504798>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:10:783592380267364382>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:11:783592379457208330>', 'name': 'eight' },
			{ 'points': 8, 'card': '<:12:783592380514435092>', 'name': 'eight' },
			{ 'points': 9, 'card': '<:13:783592379335835720>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:14:783592380501721099>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:15:783592379420639312>', 'name': 'nine' },
			{ 'points': 9, 'card': '<:16:783592380266709023>', 'name': 'nine' },
			{ 'points': 10, 'card': '<:17:783592379713060864>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:18:783592380737257473>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:19:783592379533754369>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:20:783592380774612993>', 'name': 'ten' },
			{ 'points': 10, 'card': '<:21:783592380644458507>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:22:783592380582461460>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:23:783592380266709032>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:24:783592380698722314>', 'name': 'jack' },
			{ 'points': 10, 'card': '<:25:783592380087402537>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:26:783592380439330837>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:27:783592380859154432>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:28:783592380812361738>', 'name': 'queen' },
			{ 'points': 10, 'card': '<:29:783602644707049503>', 'name': 'king' },
			{ 'points': 10, 'card': '<:30:783602644731953172>', 'name': 'king' },
			{ 'points': 10, 'card': '<:31:783602644950319135>', 'name': 'king' },
			{ 'points': 10, 'card': '<:32:783602644786610210>', 'name': 'king' },
			{ 'points': 1, 'card': '<:33:783602644983349259>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:34:783602645238546452>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:35:783602645054128128>', 'name': 'ace' },
			{ 'points': 1, 'card': '<:36:783602644999995441>', 'name': 'ace' },
		];
		this.player = new Player();
		this.bot = new Bot();
		this.nextCard = undefined;

		this.takeNextCard();
	}

	takeNextCard() {
		const cardIndex = Math.round(Math.random() * (this.cards.length - 1));
		this.nextCard = this.cards[cardIndex];
		this.cards.splice(cardIndex, 1);
	}

	getCard() {
		const card = this.nextCard;
		this.takeNextCard();

		return card;
	}
}

class Player {
	constructor() {
		this.cards = [];
		this.points = 0;
		this.cardsString = '';
	}
	addCard(card) {
		this.cards.push(card);
		this.points += card['points'];
		this.cardsString += card['card'];
	}

	takeCard(card) {
		if (card['name'] === 'ace') {
			if (this.points > 11) {
				card['points'] = 1;
			}
			else {
				// ask player which count of points he wants to set
			}
		}

		this.addCard(card);
	}
}

class Bot extends Player {
	takeCard(card) {
		if (card['name'] === 'ace') {
			if (this.points + 11 > 21) {
				card['points'] = 1;
			}
			else {
				card['points'] = 11;
			}
		}

		this.addCard(card);
	}
}

async function blackjack(interaction) {
	let bet = interaction.options.getInteger('bet');
	const user = await getUser(interaction.member.id);

	const embed = new EmbedBuilder()
		.setColor(0x2f3136)
		.setAuthor({
			iconURL: interaction.member.displayAvatarURL(),
			name: 'Blackjack',
		});

	if (user.balance < bet) {
		embed.setDescription('Not enough money');
		return interaction.editReply({ embeds: [embed] });
	}

	embed.setDescription('**You | ?**\n**?**\n**Dealer | ?**\n**?**\n');

	const message = await interaction.editReply({ embeds: [embed] });
	const session = new Session();

	async function createPlayerInteraction() {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setCustomId('take').setLabel('Take').setStyle(ButtonStyle.Success),
			new ButtonBuilder().setCustomId('pass').setLabel('Pass').setStyle(ButtonStyle.Danger),
		);
		if (session.player.points === 10 && session.player.points === 11 && user.balance >= bet * 2) {
			row.addComponents(
				new ButtonBuilder().setCustomId('double_bet').setLabel('Double bet').setStyle(ButtonStyle.Primary),
			);
		}
		await interaction.editReply({ embeds: [embed], components: [row] });
		await createPlayerButtonsCollector();
	}

	async function createPlayerButtonsCollector() {
		const collector = message.createMessageComponentCollector({
			filter: i => i.user.id === interaction.user.id,
			time: 60000,
		});

		collector.on('collect', async (i) => {
			await i.update({ components: [] });
			switch (i.customId) {
			case 'take':
				session.player.addCard(await takeCard('player', false));
				await updateInfo('player', false);
				if (session.player['points'] > 21) {
					await loose();
					await updateInfo('bot', true);
				}
				else {
					await createPlayerInteraction();
				}
				await collector.stop();
				break;
			case 'pass':
				await updateInfo('bot', true);
				while (session.bot.points < 17) {
					await new Promise(r => setTimeout(r, 500));
					session.bot.addCard(await takeCard('bot', false));
					await updateInfo('bot', true);
				}
				if (bot.points > 21) {
					await win();
				}
				else if (bot.points < player.points) {
					await win();
				}
				else if (bot.points > player.points) {
					await loose();
				}
				else if (bot.points === player.points) {
					await tie();
				}
				await updateInfo('bot', true);
				await collector.stop();
				break;
			case 'double_bet':
				bet *= 2;
				await collector.stop();
				await createPlayerInteraction();
				break;
			}
		});
	}

	async function createAceInteraction() {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setCustomId('eleven').setLabel('eleven').setStyle(ButtonStyle.Primary),
			new ButtonBuilder().setCustomId('one').setLabel('one').setStyle(ButtonStyle.Primary),
		);
		await interaction.editReply({ embeds: [embed], components: [row] });
		await createAceButtonsCollector();
	}

	async function createAceButtonsCollector(card) {
		const collector = message.createMessageComponentCollector({
			filter: i => i.user.id === interaction.user.id,
			time: 60000,
		});

		collector.on('collect', async (i) => {
			await i.update({ components: [] });

			switch (i.customId) {
			case 'eleven':
				card['points'] = 11;
				await createPlayerInteraction();
				break;
			case 'one':
				collector.stop();
				break;
			}
		});

		collector.on('end', async () => {
			card['points'] = 1;
			await createPlayerInteraction();
		});
	}

	async function updateInfo(playerType, isShowBotCards) {
		let description = `**You | ${session.player.points}**\n${session.player.cardsString}\n`;
		if (isShowBotCards) {
			description += `**Dealer | ${session.bot.points}**\n${session.bot.cardsString}\n`;
		}
		else {
			description += `**Dealer | ${session.bot.cards[0]['points']} + ?**\n${session.bot.cards[0]['card']} **+ ?**\n`;
		}
		embed.setDescription(description);
		await interaction.editReply({ embeds: [embed] });
	}

	async function endGame() {
		await user.addBalance(bet);
		embed.setFields([
			{
				name: 'Result',
				value: bet.toString(),
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
					.setCustomId('play')
					.setLabel('Play')
					.setStyle(ButtonStyle.Secondary),
			);

		return await interaction.editReply({ embeds: [embed], components: [row] });
	}

	async function win() {
		await endGame();
	}

	async function loose() {
		bet = -bet;
		await endGame();
	}

	async function tie() {
		bet = 0;
		await endGame();
	}

	for (let i = 0; i < 2; i += 1) {
		session.bot.addCard(await takeCard('bot', true));
		await updateInfo('bot', false);
		session.player.addCard(await takeCard('player', true));
		await updateInfo('player', false);
	}

	if (session.player.points === 21 && session.bot.points !== 21) {
		bet = Math.round(bet * 1.5);
		await win();
		await updateInfo('bot', true);
	}
	else if (session.player.points !== 21 && session.bot.points === 21) {
		await loose();
		await updateInfo('bot', true);
	}
	else if (session.player.points === 21 && session.bot.points === 21) {
		await tie();
		await updateInfo('bot', true);
	}

	else {
		await createPlayerInteraction();
	}
}

async function createRestartButtonCollector(message, interaction) {
	const collector = message.createMessageComponentCollector({
		filter: i => i.user.id === interaction.user.id,
		time: 15000,
	});

	collector.on('collect', async (i) => {
		await i.update({ components: [] });
		await collector.stop();
		const newMessage = await blackjack(interaction);
		await createRestartButtonCollector(newMessage, interaction);
	});

	collector.on('end', async () => await message.edit({ components: [] }));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackjack')
		.addIntegerOption(option => option.setName('bet').setDescription('Your bet').setMinValue(10).setRequired(true))
		.setDescription('Blackjack game.'),
	async execute(interaction) {
		await interaction.deferReply();
		const message = await blackjack(interaction);
	},
};
