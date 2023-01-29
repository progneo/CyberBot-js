const { Events } = require('discord.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		const newUserChannel = newState.channel;
		const oldUserChannel = oldState.channel;
		if (oldUserChannel === null && newUserChannel !== null) {
			console.log(`${newState.member.user.id} joined ${newUserChannel.name}`);
		}
		else if (oldUserChannel !== null && newUserChannel === null) {
			console.log(`${oldState.member.user.id} leaved ${oldUserChannel.name}`);
		}
	},
};