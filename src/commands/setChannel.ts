import { 
  ChatInputCommandInteraction,
  SlashCommandBuilder, 
  ChannelType 
} 
from "discord.js";
import { ChannelDatabase } from "../channelDatabase";
import { getData } from "../api/request";

const CTURL = "https://data.ninjakiwi.com/btd6/ct"

export const data = new SlashCommandBuilder()
  .setName("set_channel")
  .setDescription("set the channel for the bot to post. You can only have 1 per server.")
  .addChannelOption(option => option  
      .setName("channel")
      .setDescription("forum channel")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildForum)
  )

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const channelID = interaction.options.getChannel("channel", true).id;
    const guildID = interaction.guildId;
  
    if (!guildID) {
      return interaction.reply({
        content: "Unable to use this in dms"
      });
    }

    const ctApiData = await getData(CTURL);
    const latestEventID = ctApiData?.body[0]?.id ?? ""; 

    const db = new ChannelDatabase();
    await db.open();
    await db.addChannel(guildID, channelID, latestEventID);

    return interaction.reply({
      content: `Strategy channel set to <#${channelID}>`
    });
  } catch(error) {
    return interaction.reply({
      content: `something went wrong. Please try again.\nError: ${error}`
    })
  }
}
