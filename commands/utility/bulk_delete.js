const { SlashCommandBuilder, Message, PermissionFlagsBits } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('bulk_delete')
        .setDescription('Deletes the most recent x messages in the channel it is run in')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of messages to remove')
                .setRequired(true)
                .setMaxValue(50)
        ),

    async execute(interaction) {
        try {
            await interaction.channel.bulkDelete(interaction.options.getInteger('amount'));
        }
        catch (e) {
            interaction.reply('You can only bulk delete messages that are under 14 days old.');
        }

    },

};  