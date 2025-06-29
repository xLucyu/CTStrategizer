import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { open, Database } from "sqlite";

sqlite3.verbose()

export class ChannelDatabase {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  private filename: string = path.resolve(__dirname, "channels.db"); 

  public async open(): Promise<void> {
    const dir = path.dirname(this.filename);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database
    });
    await this.setup();
  }

  private async setup() {
    console.log(this.filename);
    await this.db.exec(`
      create table if not exists channels (
        guildId TEXT PRIMARY KEY,
        channelId TEXT
      )
    `);
  }

  public async addChannel(guildId: string, channelId: string) {
    await this.db.run(
      "insert or replace into channels (guildId, channelId) values (?, ?)", guildId, channelId
    );
  }

  public async getChannel(guildId: number) {
    return await this.db.get(
      "select * from channels where guildId = ?", guildId
    )
  }
}
