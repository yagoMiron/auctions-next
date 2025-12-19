"use client";
import styles from "./styles.module.css";
import AuctionBidCard from "@/src/components/AuctionBidCard";
import { socket } from "@/src/constants/conection";
import Auction from "@/src/types/Auction";
import { useEffect, useState } from "react";

const AuctionsCliente = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleAuctionsList(data: Auction[]) {
      // somente leilões ativos
      const ativos = data.filter((auction) => auction.status === "in_progress");

      setAuctions(ativos);
      setLoading(false);
    }

    socket.on("auctions:list", handleAuctionsList);

    return () => {
      socket.off("auctions:list", handleAuctionsList);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-evenly">
      <div className={styles.container}>
        <h2 className={styles.title}>Leilões em andamento:</h2>

        <div className={styles.card_area}>
          {loading ? (
            <p>Carregando leilões...</p>
          ) : auctions.length > 0 ? (
            auctions.map((auction) => (
              <AuctionBidCard auction={auction} key={auction.id} />
            ))
          ) : (
            <p>Não há leilões em andamento ainda</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionsCliente;
