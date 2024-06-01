const { Events } = require('discord.js');
const { execute } = require('./ready');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) {
            console.log(`NOT COMMAND: ${interaction}`)
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`Failed to find ${interaction.commandName}.`);
            return;
        }

        try {
            await command.execute(interaction);
        }
        catch (e) {
            console.error(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Something went wrong while executing this command.', ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'Something went wrong while executing this command.', ephemeral: true });
            }

        }

    }
}