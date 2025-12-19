"use client";
import Auction from "@/src/types/Auction";
import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type Props = {
  auction: Auction;
};

const AuctionBidCard = ({ auction }: Props) => {
  const [tempo, setTempo] = useState(0);

  const formatarTempo = (ms: number) => {
    if (typeof ms !== "number" || isNaN(ms)) return "0:00";
    const totalSegundos = Math.max(0, Math.floor(ms / 1000));
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const atual = new Date();
      const inicio = new Date(auction.created_at);

      const tempoPassado = atual.getTime() - inicio.getTime();
      const millisegundosFaltando = auction.minutos * 60 * 1000 - tempoPassado;

      setTempo(millisegundosFaltando);
      console.log(tempo);
    }, 1000); // espera 1 segundo antes de executar

    return () => clearTimeout(timeoutId);
  }, [tempo, auction.created_at, auction.minutos]);
  return (
    <div className={styles.auctionCard}>
      <Image
        src={auction.photo_url}
        alt={auction.title}
        width={120}
        height={120}
      />
      <span className={styles.title}>{auction.title}</span>
      <span className={styles.contador}>{formatarTempo(Number(tempo))}</span>
      <span className={styles.bid}>
        {auction.highest_bid
          ? `Lance atual: R$ ${auction.highest_bid}`
          : `Lance minimo: R$ ${auction.starting_bid}`}
      </span>
    </div>
  );
};

export default AuctionBidCard;
