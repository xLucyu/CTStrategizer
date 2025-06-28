import { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType, CommandInteraction } from "discord.js";
import { ChannelDatabase } from "../channelDatabase";

export const data = new SlashCommandBuilder()
  .setName("set_channel")
  .setDescription("set the channel for the bot to post. MUST BE A FORUM!!")
  .addChannelOption(option => option  
      .setName("channel")
      .setDescription("forum channel")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildForum)
  )

export async function execute(interaction: CommandInteraction) {
  console.log("hello");
  const channelID = interaction.options.getChannel("channel", true).id;
  const guildID = interaction.guildId;
  
  if (!guildID) {
    return interaction.reply({
      content: "Unable to use this in dms"
    });
  }

  const db = new ChannelDatabase();
  await db.addChannel(guildID, channelID);

  await interaction.reply({
    content: `bot channel set to <${channelID}>`
  });
}
