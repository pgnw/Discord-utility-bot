const { SlashCommandBuilder, Message } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes the most recent x messages in the channel it is run in')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of messages to remove')
                .setRequired(true)
                .setMaxValue(50)
        ),
    async execute(interaction) {
        await interaction.reply(interaction.client.User);
    },

};  