const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./Hello');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server_info")
        .setDescription("Provides information about the server."),
    async execute(interaction) {
        await interaction.reply(`This server is ${interaction.guild.name}, it was created at ${interaction.guild.createdAt} and it contains ${interaction.guild.memberCount} members`);
    },
};