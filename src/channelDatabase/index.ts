import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

sqlite3.verbose()

export class ChannelDatabase {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  private filename: string = "../channelDatabase/channels.db"

  constructor() {
    this.open();
  }

  private async open() {
    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database
    });

    await this.setup();
  }

  private async setup() {
    await this.db.exec(`
      create table if not exists channels (
        guildId TEXT PRIMARY KEY,
        channelId TEXT
      )
    `);
  }

  async addChannel(guildId: string, channelId: string) {
    await this.db.run(
      "insert or replace into channels (guildId, channelId) values (?, ?)", guildId, channelId
    );
  }

  async getChannel(guildId: number) {
    return await this.db.get(
      "select * from channels where guildId = ?", guildId
    )
  }
}
