require('dotenv').config();
const Sequelize = require('sequelize');
const { getServerObject } = require('../app.js');

const sequelize = new Sequelize(process.env.database_url, {
	logging: false,
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Servers = require('./models/Servers.js')(sequelize, Sequelize.DataTypes);
const ServerUsers = require('./models/ServerUsers.js')(sequelize, Sequelize.DataTypes);
const ServerAdmins = require('./models/ServerAdmins.js')(sequelize, Sequelize.DataTypes);
const ServerRoles = require('./models/ServerRoles.js')(sequelize, Sequelize.DataTypes);
const VoiceSessions = require('./models/VoiceSessions.js')(sequelize, Sequelize.DataTypes);

ServerAdmins.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });
ServerAdmins.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

ServerUsers.hasOne(Servers, { foreignKey: 'server_id', as: 'server' });
ServerUsers.hasOne(Users, { foreignKey: 'user_id', as: 'user' });
ServerUsers.hasOne(ServerRoles, { foreignKey: 'role_id', as: 'role' });

ServerRoles.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });

VoiceSessions.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });
VoiceSessions.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Reflect.defineProperty(ServerUsers.prototype, 'updateRoles', {
	value: async function updateRoles() {
		const role = await ServerRoles.findOne({
			where: { server_id: this.server_id, target_level: { [Sequelize.Op.lte]: this.level } },
			order: [['target_level', 'DESC']],
		});
		if (role) {
			if (this.role_id !== role.role_id) {
				const server = await getServerObject(this.server_id);
				const member = await server.members.fetch(this.user_id);
				if (this.role_id) {
					await member.roles.remove(this.role_id);
				}
				await member.roles.add(role.role_id);
				this.role_id = role.role_id;
			}
			this.save();
		}
	},
});

Reflect.defineProperty(Servers.prototype, 'getRoles', {
	value: function getRoles() {
		return ServerRoles.findAll({
			where: { server_id: this.server_id },
			order: [['target_level', 'ASC']],
		});
	},
});

Reflect.defineProperty(Servers.prototype, 'getUsers', {
	value: function getUsers() {
		return ServerUsers.findAll({
			where: { server_id: this.server_id },
			include: ['user'],
		});
	},
});

Reflect.defineProperty(Servers.prototype, 'getAdmins', {
	value: function getAdmins() {
		return ServerAdmins.findAll({
			where: { server_id: this.server_id },
			include: ['user'],
		});
	},
});

Reflect.defineProperty(Users.prototype, 'updateDaily', {
	value: function updateDaily() {
		this.last_daily = Date.now();
		return this.save();
	},
});

Reflect.defineProperty(Users.prototype, 'addBalance', {
	value: function addBalance(amount) {
		this.balance += amount;
		return this.save();
	},
});

module.exports = { Users, Servers, ServerUsers, ServerRoles, VoiceSessions };
