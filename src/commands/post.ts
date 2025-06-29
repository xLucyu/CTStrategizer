import { CommandInteraction, SlashCommandBuilder, ForumChannel } from "discord.js";
import { EventData } from "../api/types";
import { getData } from "../api/request";
import { getCurrentCtNumber } from "../utils/getEventNumber";
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

  await interaction.deferReply();

  const ctApiData = await getData(CTURL);
  const latestEventID = ctApiData?.body[0]?.id ?? "";
  const timeStamp = ctApiData?.body[0]?.start ?? 0;

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
  await db.addChannel(currentGuild.guildId, currentGuild.channelId, latestEventID);

  const ctNumber = getCurrentCtNumber(timeStamp);
  const tileApiURL = `https://storage.googleapis.com/btd6-ct-map/events/${ctNumber}/tiles.json`;
  const ctTileApi = await getData<EventData>(tileApiURL);
  const testTile = ctTileApi["MRX"];

  await interaction.editReply({
    content: `Creating forums posts for event ${ctNumber} This might take a while!`
  });

  await forum.threads.create({
    name: testTile.Code,
    message: {
      content: testTile.GameData.selectedMap
    }
  });

  return await interaction.editReply({
    content: "Successfully create forum posts. Have fun strategizing!"
  })

  /* 
  for (const code of Object.values(ctTileApi)) {
    const tileType = code.TileType;
    if (tileType !== "Banner" && tileType !== "Relic") continue;
    console.log(tileType);
    await forum.threads.create({
      name: code.Code,  
      message: {
        content: code.GameData.selectedMap
      }
    });
  }
  */
}
