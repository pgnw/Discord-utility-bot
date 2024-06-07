const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user_info')
        .setDescription("Displays information about the user."),

    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who has a user id of ${interaction.user.id}.`)
    }

}