import mock from "./mock.json";
import AuctionCard from "../AuctionCard";

const HistoricoLeilao = () => {
  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      {mock.length > 0 ? (
        mock.map((auction, index) => (
          <AuctionCard auction={auction} key={index} />
        ))
      ) : (
        <p className="text-xl font-bold">Você ainda não tem itens leiloados</p>
      )}
    </div>
  );
};
export default HistoricoLeilao;
