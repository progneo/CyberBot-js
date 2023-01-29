const { Users, Servers, ServerRoles, ServerUsers } = require('./dbObjects.js');

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
		serverUser = addServerUser(serverId, userId);
	}

	return serverUser;
}
async function addServerUser(serverId, userId) {
	await getServer(serverId);
	await getUser(userId);

	return await ServerUsers.create({ server_id: serverId, user_id: userId });
}

// Server Roles
async function addServerRole(serverId, roleId, targetLevel) {
	await getServer(serverId);

	return await ServerRoles.create({ server_id: serverId, role_id: roleId, target_level: targetLevel });
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

// Experience
async function addExperience(userId, serverId, experience) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.experience += Number(experience);

	while (serverUser.experience >= serverUser.level * 50 + 30) {
		serverUser.experience -= serverUser.level * 50 + 30;
		serverUser.level += 1;
	}

	return serverUser.save();
}

// Level
async function addLevel(userId, serverId, level) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.level += Number(level);

	return serverUser.save();
}
async function setLevel(userId, serverId, level) {
	const serverUser = await getServerUser(serverId, userId);

	serverUser.level = Number(level);

	return serverUser.save();
}

module.exports = { addExperience };