import fs from 'fs';
import path from 'path';

export class Database {
  private static instance: Database;
  private dbPath: string;
  private data: any;

  private constructor() {
    this.dbPath = path.resolve(__dirname, '../../data/db.json');
    if (!fs.existsSync(path.dirname(this.dbPath))) fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
    if (!fs.existsSync(this.dbPath)) fs.writeFileSync(this.dbPath, JSON.stringify({ users: [] }, null, 2));
    this.data = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
  }

  public static getInstance() {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public read() {
    this.data = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
    return this.data;
  }

  public write() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  public get collection() {
    return this.data;
  }
}
