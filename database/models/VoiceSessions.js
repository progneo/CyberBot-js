module.exports = (sequelize, DataTypes) => sequelize.define('voice_session', {
	user_id: DataTypes.STRING,
	server_id: DataTypes.STRING,
	date_join: DataTypes.DATE,
}, {
	timestamps: false,
});