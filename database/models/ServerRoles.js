module.exports = (sequelize, DataTypes) => sequelize.define('server_role', {
	server_id: DataTypes.STRING,
	role_id: DataTypes.STRING,
	target_level: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
}, {
	timestamps: false,
});
