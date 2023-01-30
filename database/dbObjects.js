const Sequelize = require('sequelize');
const { database_url } = require('../config.json');

const sequelize = new Sequelize(database_url);

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Servers = require('./models/Servers.js')(sequelize, Sequelize.DataTypes);
const ServerUsers = require('./models/ServerUsers.js')(sequelize, Sequelize.DataTypes);
const ServerAdmins = require('./models/ServerAdmins.js')(sequelize, Sequelize.DataTypes);
const ServerRoles = require('./models/ServerRoles.js')(sequelize, Sequelize.DataTypes);

ServerAdmins.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });
ServerAdmins.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

ServerUsers.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });
ServerUsers.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

ServerRoles.belongsTo(Servers, { foreignKey: 'server_id', as: 'server' });

Reflect.defineProperty(Servers.prototype, 'getRoles', {
	value: () => {
		return ServerRoles.findAll({
			where: { server_id: this.server_id },
			include: ['role_id'],
		});
	},
});

Reflect.defineProperty(Servers.prototype, 'getUsers', {
	value: () => {
		return ServerUsers.findAll({
			where: { server_id: this.server_id },
			include: ['user'],
		});
	},
});

Reflect.defineProperty(Servers.prototype, 'getAdmins', {
	value: () => {
		return ServerAdmins.findAll({
			where: { server_id: this.server_id },
			include: ['user'],
		});
	},
});


module.exports = { Users, Servers, ServerUsers, ServerRoles };
