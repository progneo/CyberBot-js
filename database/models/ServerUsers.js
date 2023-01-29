module.exports = (sequelize, DataTypes) => sequelize.define('server_user', {
	user_id: DataTypes.STRING,
	server_id: DataTypes.STRING,
	role_id: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	experience: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	level: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	voiceTime: {
		type: DataTypes.BIGINT,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	timestamps: false,
});
