import FormAuctioneer from "@/src/components/FormAuctioneer";
import styles from "./styles.module.css";
import mock from "./mock.json";
import HistoricoLeilao from "@/src/components/HistoricoLeilao";
import AuctionBidCard from "@/src/components/AuctionBidCard";

const Auctioneer = () => {
  return (
    <div className="w-full flex items-center justify-evenly ">
      <div className={styles.container}>
        <h2 className={styles.title}>Leilões em andamento:</h2>
        <div className={styles.card_area}>
          {mock.length > 0 ? (
            mock.map((auction, index) => (
              <AuctionBidCard auction={auction} key={index} />
            ))
          ) : (
            <p>Não á leilões em andamento ainda</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auctioneer;
