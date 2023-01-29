module.exports = (sequelize, DataTypes) => sequelize.define('users', {
	user_id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	balance: {
		type: DataTypes.INTEGER,
		defaultValue: 500,
		allowNull: false,
	},
}, {
	timestamps: false,
});