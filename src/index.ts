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

  public executeCommand() {
      this.client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand() || !interaction.isCommand()) return; 
        const { commandName } = interaction;

        if (commands[commandName as keyof typeof commands]) { 
          commands[commandName as keyof typeof commands].execute(interaction);
      }
      });
  }

  public startBot() {
    this.client.login(config.TOKEN);
    this.client.once("ready", async () => {
      console.log("Bot is online");
      await syncCommands({ global: true })
    })
  }
}

if (require.main == module) {
  new BotClient().startBot();
} 
