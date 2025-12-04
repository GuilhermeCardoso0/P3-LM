import fs from 'fs';
import path from 'path';

beforeEach(() => {
  const dbPath = path.resolve(__dirname, '../data/db.json');
  if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
});
