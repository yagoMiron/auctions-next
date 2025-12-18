import FormAuctioneer from "@/src/components/FormAuctioneer";
import styles from "./styles.module.css";
import HistoricoLeilao from "@/src/components/HistoricoLeilao";

const Auctioneer = () => {
  return (
    <div className="w-full flex items-center justify-evenly ">
      <div className={styles.container}>
        <h2 className={styles.title}>Leilões em andamento:</h2>
        <div className="h-60 flex items-center font-bold">
          <p>Não á leilões em andamento ainda</p>
        </div>
      </div>
    </div>
  );
};

export default Auctioneer;
