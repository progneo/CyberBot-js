const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsDirectories = fs.readdirSync('./commands');
const commandsFiles = [];
for (const directory of commandsDirectories) {
	const files = fs.readdirSync(`./commands/${directory}`).filter(file => file.endsWith('.js'));
	for (const file of files) {
		commandsFiles.push(`./commands/${directory}/${file}`);
	}
}

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandsFiles) {
	const command = require(file);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

console.log(commands);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();