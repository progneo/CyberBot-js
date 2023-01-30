const Sequelize = require('sequelize');
const { database_url } = require('../config.json');

const sequelize = new Sequelize(database_url);

require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/Servers.js')(sequelize, Sequelize.DataTypes);
require('./models/ServerUsers.js')(sequelize, Sequelize.DataTypes);
require('./models/ServerAdmins.js')(sequelize, Sequelize.DataTypes);
require('./models/ServerRoles.js')(sequelize, Sequelize.DataTypes);
require('./models/VoiceSessions.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);
