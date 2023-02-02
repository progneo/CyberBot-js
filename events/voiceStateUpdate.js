const { Events } = require('discord.js');
const { createVoiceSession, removeVoiceSession, getVoiceSession } = require('../database/dbHelpers.js');
const { addExperience } = require('../database/dbHelpers.js');
const { getServerUser } = require('../database/dbHelpers.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		const newUserChannel = newState.channel;
		const oldUserChannel = oldState.channel;
		if (oldUserChannel === null && newUserChannel !== null) {
			await createVoiceSession(newState.guild.id, newState.member.user.id);
		}
		else if (oldUserChannel !== null && newUserChannel === null) {
			const session = await getVoiceSession(oldState.guild.id, oldState.member.user.id);
			if (session) {
				const timestampJoin = Math.floor(Date.parse(session.date_join) / 1000);
				const timestampLeave = Math.floor(Date.now() / 1000);
				const minutes = Math.floor((timestampLeave - timestampJoin) / 60);
				if (minutes > 0) {
					await addExperience(session.user_id, session.server_id, minutes);
					const user = await getServerUser(session.server_id, session.user_id);
					user.voiceTime += minutes;
					await user.save();
				}
				await removeVoiceSession(session.server_id, session.user_id);
			}
		}
	},
};