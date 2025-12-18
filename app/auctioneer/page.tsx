import FormAuctioneer from "@/src/components/FormAuctioneer";
import styles from "./styles.module.css";
import HistoricoLeilao from "@/src/components/HistoricoLeilao";

const Auctioneer = () => {
  return (
    <div className="w-full flex items-center justify-evenly ">
      <div className={styles.container}>
        <h2 className={styles.title}>Leiloe um Item</h2>
        <FormAuctioneer />
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Histórico de leilões</h2>
        <HistoricoLeilao />
      </div>
    </div>
  );
};

export default Auctioneer;
