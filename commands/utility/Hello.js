const { SlashCommandBuilder } = require("discord.js");



module.exports = {
    date: new SlashCommandBuilder()
	.setName('Hello')
	.setDescription('Replies with HELLO'),
    async execute(interaction)
    {
        await interaction.reply("Hello");
    },
    
};  