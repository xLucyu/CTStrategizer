import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import { config } from "./config";
import { commands } from "./commands";

export type DeployCommandsProps = {
  guildId?: string;
  global?: boolean;
};

export async function syncCommands({ guildId, global = false }: DeployCommandsProps) {
  const commandsData = Object.values(commands).map((command) => command.data);
  const rest = new REST({ version: "10" }).setToken(config.TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    if (global) {
      await rest.put(
        Routes.applicationCommands(config.ID),
        { body: commandsData }
      );
      console.log("Successfully reloaded global application (/) commands.");
    } else if (guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.ID, guildId),
        { body: commandsData }
      );
      console.log(`Successfully reloaded guild (/) commands for guild ${guildId}.`);
    } else {
      console.warn("No guildId or global flag provided. Nothing was synced.");
    }
  } catch (error) {
    console.error("Error syncing commands:", error);
  }
}
