const { Events } = require('discord.js');
const { getServerUser } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		if (member.user.bot) return;
		const serverUser = await getServerUser();
		serverUser.updateRoles();
	},
};