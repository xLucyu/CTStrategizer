import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { open, Database } from "sqlite";

sqlite3.verbose()

export class ChannelDatabase {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  private filename: string = path.resolve(__dirname, "channels.db"); 

  public async open(): Promise<void> {
    const directory = path.dirname(this.filename);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database
    });
    await this.setup();
  }

  private async setup(): Promise<void> {
    console.log(this.filename);
    await this.db.exec(`
      create table if not exists channels (
        guildId TEXT PRIMARY KEY,
        channelId TEXT,
        CTID TEXT
      )
    `);
  }

  public async addChannel(guildID: string, channelID: string, latestEventID: string): Promise<void> {
    await this.db.run(
      "insert or replace into channels (guildID, channelID, CTID) values (?, ?, ?)", guildID, channelID, latestEventID
    );
  }

  public async getChannel(guildID: number): Promise<any> {
    return await this.db.get(
      "select * from channels where guildId = ?", guildID
    )
  }
}
