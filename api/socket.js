import { Server } from "socket.io";

import {
  createAuction,
  listAuctions,
  placeBid,
  finalizeAuction,
  cancelAuction,
  listBids,
  getAuctionById,
} from "../db/database";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // ajuste para o domínio do seu front-end depois!
  },
});

// -------------------------
//       EVENTOS SOCKET.IO
// -------------------------

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Enviar lista inicial de leilões
  socket.emit("auctions:list", listAuctions());

  // -----------------------------
  //     CRIAR NOVO LEILÃO
  // -----------------------------
  socket.on("auction:create", (data, callback) => {
    try {
      const result = createAuction(data);

      const newAuction = getAuctionById(Number(result.id));

      // Notifica todos
      io.emit("auction:created", newAuction);

      callback?.({ ok: true, auction: newAuction });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });

  // -----------------------------
  //           DAR LANCE
  // -----------------------------
  socket.on("bid:place", (data, callback) => {
    try {
      placeBid(data);

      const auction = getAuctionById(data.auction_id);
      const bids = listBids(data.auction_id);

      // Atualiza todos os clientes
      io.emit("bid:updated", {
        auction,
        bids,
      });

      callback?.({ ok: true });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });

  // -----------------------------
  //       FINALIZAR LEILÃO
  // -----------------------------
  socket.on("auction:finalize", (id, callback) => {
    try {
      finalizeAuction(id);

      io.emit("auction:finalized", getAuctionById(id));

      callback?.({ ok: true });
    } catch (err) {
      callback?.({ ok: false, error: err.message });
    }
  });

  // -----------------------------
  //       CANCELAR LEILÃO
  // -----------------------------
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
