const { Users, Servers, ServerRoles, ServerUsers, VoiceSessions } = require('./dbObjects.js');

// Server
async function getServer(id) {
	let server = await Servers.findOne({
		where: { server_id: id },
	});
	if (!server) {
		server = await addServer(id);
	}

	return server;
}
async function addServer(id) {
	return await Servers.create({ server_id: id });
}

// User
async function getUser(id) {
	let user = await Users.findOne({
		where: { user_id: id },
	});
	if (!user) {
		user = addUser(id);
	}

	return user;
}
async function addUser(id) {
	return await Users.create({ user_id: id });
}

// Server Users
async function getServerUser(serverId, userId) {
	let serverUser = await ServerUsers.findOne({
		where: { user_id: userId, server_id: serverId },
	});
	if (!serverUser) {
		serverUser = await addServerUser(serverId, userId);
	}

	return serverUser;
}
async function addServerUser(serverId, userId) {
	await getServer(serverId);
	await getUser(userId);

	const serverUser = await ServerUsers.create({ server_id: serverId, user_id: userId });
	await serverUser.updateRoles();

	return serverUser;
}

// Server Roles
async function addServerRole(serverId, roleId, targetLevel) {
	const server = await getServer(serverId);
	let role = await ServerRoles.findOne({
		where: { server_id: serverId, role_id: roleId },
	});
	if (role) {
		role.target_level = targetLevel;
		role.save();
		await updateUsersRoles(server);
		return role;
	}
	role = await ServerRoles.findOne({
		where: { server_id: serverId, target_level: targetLevel },
	});
	if (role) {
		role.roleId = roleId;
		role.save();
		await updateUsersRoles(server);
		return role;
	}

	role = await ServerRoles.create({ server_id: serverId, role_id: roleId, target_level: targetLevel });
	await updateUsersRoles(server);

	return role;
}
async function getServerRoles(serverId) {
	await getServer(serverId);
	return await ServerRoles.findAll({
		where: { server_id: serverId },
	});
}
async function updateUsersRoles(server) {
	const users = await server.getUsers();
	for (const user of users) {
		await user.updateRoles();
	}
}

// Voice Session
async function createVoiceSession(serverId, userId) {
	await getServer(serverId);
	await getUser(userId);

	return await VoiceSessions.create({
		server_id: serverId,
		user_id: userId,
		date_join: Date.now(),
	});
}
async function getVoiceSession(serverId, userId) {
	return await VoiceSessions.findOne({
		where: { server_id: serverId, user_id: userId },
	});
}
async function removeVoiceSession(serverId, userId) {
	const session = await getVoiceSession(serverId, userId);
	if (session) {
		const timestampJoin = Math.floor(Date.parse(session.date_join) / 1000);
		const timestampLeave = Math.floor(Date.now() / 1000);
		const seconds = Math.floor(timestampLeave - timestampJoin);
		if (seconds > 0) {
			await addExperience(session.user_id, session.server_id, Math.floor(seconds / 60));
			const user = await getServerUser(session.server_id, session.user_id);
			user.voiceTime += seconds;
			await user.save();
		}
		return await VoiceSessions.destroy({
			where: { server_id: serverId, user_id: userId },
		});
	}
}

// Balance
async function addBalance(id, amount) {
	const user = await getUser(id);

	user.balance += Number(amount);

	return user.save();
}
async function setBalance(id, amount) {
	const user = await getUser(id);

	user.balance = Number(amount);

	return user.save();
}
async function transferBalance(senderId, targetId, amount) {
	const sender = await getUser(senderId);
	const target = await getUser(targetId);
	if (sender.balance < amount) {
		return false;
	}
	else {
		sender.balance -= amount;
		target.balance += amount;
		sender.save();
		target.save();
		return true;
	}
}

// Experience
async function addExperience(userId, serverId, experience) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.experience += Number(experience);

	while (serverUser.experience >= serverUser.level * 50 + 30) {
		serverUser.experience -= serverUser.level * 50 + 30;
		serverUser.level += 1;
		serverUser.updateRoles();
	}

	return serverUser.save();
}

// Level
async function addLevel(userId, serverId, level) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.level += Number(level);
	serverUser.updateRoles();

	return serverUser.save();
}
async function setLevel(userId, serverId, level) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.level = Number(level);
	await serverUser.updateRoles();

	return serverUser.save();
}

module.exports = {
	addExperience,
	getServerRoles,
	addServerRole,
	getUser,
	getServer,
	getServerUser,
	createVoiceSession,
	removeVoiceSession,
	getVoiceSession,
	transferBalance,
	setLevel,
};