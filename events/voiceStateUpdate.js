const { Events } = require('discord.js');
const { createVoiceSession, removeVoiceSession } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		if (newState.member.bot) return;

		const afkChannel = newState.guild.afkChannel;
		const newUserChannel = newState.channel;
		const oldUserChannel = oldState.channel;
		if (oldUserChannel === null && newUserChannel !== null) {
			if (afkChannel === null || newUserChannel.id !== afkChannel.id) {
				await createVoiceSession(newState.guild.id, newState.member.user.id);
			}
		}
		else if (oldUserChannel !== null && newUserChannel === null) {
			if (afkChannel === null || oldUserChannel.id !== afkChannel.id) {
				await removeVoiceSession(oldState.guild.id, oldState.member.user.id);
			}
		}
		else if (oldUserChannel !== null && newUserChannel !== null) {
			if (afkChannel === null || newUserChannel.id !== afkChannel.id) {
				await createVoiceSession(newState.guild.id, newState.member.user.id);
			}
			if (afkChannel === null || oldUserChannel.id !== afkChannel.id) {
				await removeVoiceSession(oldState.guild.id, oldState.member.user.id);
			}
		}
	},
};