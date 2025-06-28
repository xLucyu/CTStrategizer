import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { syncCommands } from "./syncCommands";

export class BotClient {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: ["Guilds", "GuildMessages"]
    });

    this.registerCommands();
    this.executeCommand();
  }

  private registerCommands(): void {
    this.client.on("guildCreate", async (guild) => {
      await syncCommands({ guildId: guild.id });
    });
  }

  private executeCommand() {
      this.client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        const command = commands[commandName as keyof typeof commands];
        if (command) {
          await command.execute(interaction);
        }
      });
  }

  public startBot() {
    this.client.login(config.TOKEN);
    this.client.once("ready", async () => {
      console.log("Bot is online");
    })
  }
}

if (require.main == module) {
  new BotClient().startBot();
} 
