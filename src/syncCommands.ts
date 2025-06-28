import { REST, Routes } from "discord.js";
import { config } from "./config";
import path from "node:path";
import fs from "node:fs/promises";

type DeployCommandsProps = {
  guildId: string;
};

export async function syncCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");

    // Dynamically load command modules from commands folder
    const commandsPath = path.join(__dirname, "commands");
    const files = await fs.readdir(commandsPath);
    const commands = [];

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;
      if (file === "index.ts" || file === "index.js") continue;

      // Dynamic import of each command file
      const commandModule = await import(path.join(commandsPath, file));
      if (commandModule.data) {
        commands.push(commandModule.data.toJSON());
      }
    }

    const rest = new REST({ version: "10" }).setToken(config.TOKEN);

    await rest.put(
      Routes.applicationGuildCommands(config.ID, guildId),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error syncing commands:", error);
  }
}
