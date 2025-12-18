import Auction from "@/src/types/Auction";
import Image from "next/image";
import styles from "./styles.module.css";

type Props = {
  auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
  return (
    <div className={styles.auctionCard}>
      <Image
        src={auction.photo_url}
        alt={auction.title}
        width={80}
        height={80}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-bold">{auction.title}</span>
        <span>{auction.status}</span>
        <span>
          {auction.highest_bid && "Maior lance R$"}{" "}
          {auction.highest_bid?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
export default AuctionCard;
