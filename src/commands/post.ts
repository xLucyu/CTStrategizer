import { CommandInteraction, SlashCommandBuilder, ForumChannel } from "discord.js";
import { EventData } from "../api/types";
import { getData } from "../api/request";
import { ChannelDatabase } from "../channelDatabase";

const CTURL = "https://data.ninjakiwi.com/btd6/ct"

interface ChannelEntry {
  guildId: string;
  channelId: string;
  CTID: string;
}

export const data = new SlashCommandBuilder()
  .setName("post")
  .setDescription("post the new events data to plan!")
 

export async function execute(interaction: CommandInteraction) {
  const ctApiData = await getData(CTURL);
 // const latestEventID = ctApiData?.body[0]?.id ?? "";

  const db = new ChannelDatabase();
  await db.open();
  const currentGuild: ChannelEntry = await db.getChannel(interaction.guildId);

  /* will be used later when finished
  if (latestEventID === currentGuild.CTID) {
    return interaction.reply({
      content: "This has already been used for the current CT Event!",
      ephemeral: true
    })
  }
  */

  const guildChannel = await interaction.client.channels.fetch(currentGuild.channelId);
  const forum = guildChannel as ForumChannel;

  await forum.threads.create({
    name: "test",
    message: {
      content: "testing!! :3"
    }
  });
}
