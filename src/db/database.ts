// src/db/database.ts
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Caminho do banco (persistente)
const dbPath = path.join(process.cwd(), "src/db/auction.db");

// Cria pasta se não existir
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Abre/cria o banco
const db = new Database(dbPath);

// ----------------------
//  CRIAÇÃO DAS TABELAS
// ----------------------

db.exec(`
CREATE TABLE IF NOT EXISTS auctions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  finished_at TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  starting_bid REAL NOT NULL,
  highest_bid REAL,
  highest_bidder TEXT,
  status TEXT CHECK(status IN ('in_progress','finalized','cancelled')) NOT NULL
);

CREATE TABLE IF NOT EXISTS bids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  auction_id INTEGER NOT NULL REFERENCES auctions(id),
  bidder_name TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auctions_created_at ON auctions(created_at);
CREATE INDEX IF NOT EXISTS idx_bids_auction_id ON bids(auction_id);
`);

// --------------------------------------------
//               FUNÇÕES DO BANCO
// --------------------------------------------

export const createAuction = (data: {
  title: string;
  description: string;
  photo_url?: string;
  starting_bid: number;
}) => {
  const stmt = db.prepare(`
    INSERT INTO auctions (created_at, title, description, photo_url, starting_bid, status)
    VALUES (datetime('now'), ?, ?, ?, ?, 'in_progress')
  `);

  const result = stmt.run(
    data.title,
    data.description,
    data.photo_url || null,
    data.starting_bid
  );

  return { id: result.lastInsertRowid };
};

export const listAuctions = () => {
  return db.prepare("SELECT * FROM auctions ORDER BY created_at DESC").all();
};

export const getAuctionById = (id: number) => {
  return db.prepare("SELECT * FROM auctions WHERE id = ?").get(id);
};

export const placeBid = (data: {
  auction_id: number;
  bidder_name: string;
  amount: number;
}) => {
  const auction: any = getAuctionById(data.auction_id);

  if (!auction) throw new Error("Leilão não encontrado");
  if (auction.status !== "in_progress")
    throw new Error("Este leilão não está ativo");

  const minimumBid = auction.highest_bid ?? auction.starting_bid;
  if (data.amount <= minimumBid)
    throw new Error(`O lance deve ser maior que ${minimumBid}`);

  // Inserir lance
  db.prepare(
    `
    INSERT INTO bids (auction_id, bidder_name, amount, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `
  ).run(data.auction_id, data.bidder_name, data.amount);

  // Atualizar highest_bid
  db.prepare(
    `
    UPDATE auctions
    SET highest_bid = ?, highest_bidder = ?
    WHERE id = ?
  `
  ).run(data.amount, data.bidder_name, data.auction_id);
};

export const finalizeAuction = (id: number) => {
  return db
    .prepare(
      `
    UPDATE auctions
    SET status = 'finalized', finished_at = datetime('now')
    WHERE id = ?
  `
    )
    .run(id);
};

export const cancelAuction = (id: number) => {
  return db
    .prepare(
      `
    UPDATE auctions
    SET status = 'cancelled', finished_at = datetime('now')
    WHERE id = ?
  `
    )
    .run(id);
};

export const listBids = (auction_id: number) => {
  return db
    .prepare("SELECT * FROM bids WHERE auction_id = ? ORDER BY amount DESC")
    .all(auction_id);
};
