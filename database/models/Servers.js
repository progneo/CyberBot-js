module.exports = (sequelize, DataTypes) => sequelize.define('servers', {
	server_id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
}, {
	timestamps: false,
});
