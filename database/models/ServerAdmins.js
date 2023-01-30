module.exports = (sequelize, DataTypes) => sequelize.define('server_admin', {
	server_id: DataTypes.STRING,
	user_id: DataTypes.STRING,
}, {
	timestamps: false,
});
