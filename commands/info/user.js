const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getServerUser, getUser } = require('../../database/dbHelpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.addUserOption(option => option.setName('member').setDescription('Target Member'))
		.setDescription('Shows information about member: level, experience, balance and voice time.'),
	async execute(interaction) {
		const guild = interaction.guild;
		let member = interaction.options.getUser('member');
		if (!member) {
			member = interaction.member;
		}
		const user = await getUser(member.user.id);
		const serverUser = await getServerUser(guild.id, member.user.id);

		const ms = serverUser.voiceTime * 1000;
		const hours = Math.floor(serverUser.voiceTime / 60 / 60);
		const time = new Date(ms).toISOString().slice(14, 19);

		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle(`${member.displayName}'s info`)
			.setThumbnail(member.displayAvatarURL())
			.setDescription(`**Level:** ${serverUser.level}\n` +
				`**Experience:** ${serverUser.experience}\\${serverUser.level * 50 + 30}\n` +
				`**Balance:** ${user.balance}\n` +
				`**Voice time:** ${hours}:${time}`);
		return interaction.reply({ embeds: [embed] });
	},
};
