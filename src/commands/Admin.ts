import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { syncCommands } from "../syncCommands";

export const data = new SlashCommandBuilder()
  .setName("sync")
  .setDescription("sync commands")

export async function execute(interaction: CommandInteraction) { 
  await syncCommands({ guildId: interaction.guildId! })  
}
