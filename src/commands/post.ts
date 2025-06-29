import { 
  CommandInteraction,
  SlashCommandBuilder,  
} 
from "discord.js";
import { EventData } from "../api/types";

export const data = new SlashCommandBuilder()
  .setName("post")
  .setDescription("post the new events data to plan!")
 

export async function execute(interaction: CommandInteraction) {
  console.log(interaction.commandName);
}
