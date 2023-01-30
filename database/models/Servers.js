module.exports = (sequelize, DataTypes) => sequelize.define('servers', {
	server_id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	default_role_id: {
		type: DataTypes.STRING,
		allowNull: true,
	},
}, {
	timestamps: false,
});
