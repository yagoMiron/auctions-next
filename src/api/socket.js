import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();

import {
  createAuction,
  listAuctions,
  placeBid,
  finalizeAuction,
  cancelAuction,
  listBids,
  getAuctionById,
} from "../db/database.ts";

const io = new Server(server, {
  cors: {
    origin: "*", // ajuste para o domínio do seu front-end depois!
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Enviar lista inicial de leilões
  socket.emit("auctions:list", listAuctions());
  socket.on("auction:create", (data, callback) => {
    try {
      const result = createAuction(data);
      const newAuction = getAuctionById(Number(result.id));
      io.emit("auction:created", newAuction);

      callback?.({ ok: true, auction: newAuction });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });

  socket.on("bid:place", (data, callback) => {
    try {
      placeBid(data);
      const auction = getAuctionById(data.auction_id);
      const bids = listBids(data.auction_id);
      io.emit("bid:updated", {
        auction,
        bids,
      });

      callback?.({ ok: true });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });
  socket.on("auction:finalize", (id, callback) => {
    try {
      finalizeAuction(id);

      io.emit("auction:finalized", getAuctionById(id));

      callback?.({ ok: true });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });
  socket.on("auction:cancel", (id, callback) => {
    try {
      cancelAuction(id);

      io.emit("auction:cancelled", getAuctionById(id));

      callback?.({ ok: true });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🔥 Socket.IO rodando na porta ${PORT}`);
});
