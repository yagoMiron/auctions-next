"use client";
import AuctionCard from "../AuctionCard";
import { useEffect, useState } from "react";
import Auction from "@/src/types/Auction";
import { socket } from "@/src/constants/conection";

const HistoricoLeilao = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleAuctionsList(data: Auction[]) {
      setAuctions(data);
      setLoading(false);
    }

    socket.on("auctions:list", handleAuctionsList);

    // limpeza para evitar listeners duplicados
    return () => {
      socket.off("auctions:list", handleAuctionsList);
    };
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-xl font-bold">Carregando leilões...</p>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))
      ) : (
        <p className="text-xl font-bold">Você ainda não tem itens leiloados</p>
      )}
    </div>
  );
};

export default HistoricoLeilao;
