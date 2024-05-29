// Require the necessary discord.js classes
const filesystem = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = filesystem.readdirSync(foldersPath);

for (const folder of commandFolders)
{
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = filesystem.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for(const file of commandFiles)
		{
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command)
			{
				client.commands.set(command.data.name, command);
			}
			else
			{
				console.log(`[WARNING] command at ${filePath} is missing the data or execute property.`);
			}
		}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand())
		{
			console.log(`NOT COMMAND: ${interaction}`)
			return;
		}
		
	
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command){
		console.error(`Failed to find ${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (e) {
		console.error(e);
		if (interaction.replied || interaction.deferred)
		{
			await interaction.followUp({content: 'Somthing went wrong while executing this command.', ephemeral: true});
		}
		else
		{
			await interaction.reply({content: 'Somthing went wrong while executing this command.', ephemeral: true});
		}

	}

	console.log(interaction);
})

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
