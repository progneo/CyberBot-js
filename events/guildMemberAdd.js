const { Events } = require('discord.js');
const { getServer } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		if (member.user.bot) return;
		const server = await getServer(member.guild.id);
		if (server.default_role_id) {
			await member.roles.add(server.default_role_id);
		}
	},
};