// Require the necessary discord.js classes
const filesystem = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, Gate] });

client.commands = new Collection();



const foldersPath = path.join(__dirname, 'commands');
const commandFolders = filesystem.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = filesystem.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] command at ${filePath} is missing the data or execute property.`);
		}
	}
}

// Add event listeners for all the events within the events folder.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = filesystem.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

}



// Log in to Discord with your client's token
client.login(token);


//TODO
// add some sort of message logging