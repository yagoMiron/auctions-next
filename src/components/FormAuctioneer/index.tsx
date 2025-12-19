"use client";
import { useState } from "react";
import TextInput from "../TextInput";
import LongTextInput from "../LongTextInput";
import { socket } from "@/src/constants/conection";

const FormAuctioneer = () => {
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [lanceInicial, setLanceInicial] = useState("");
  const [imagem, setImagem] = useState("");
  const [duracao, setDuracao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    socket.emit(
      "auction:create",
      {
        title: titulo,
        description,
        starting_bid: Number(lanceInicial),
        photo_url: imagem,
        minutos: Number(duracao),
      },
      (response: { ok: boolean; auction?: any; error?: string }) => {
        setLoading(false);

        if (!response.ok) {
          alert(response.error);
          return;
        }

        // limpar formulário
        setTitulo("");
        setDescription("");
        setLanceInicial("");
        setImagem("");
        setDuracao("");
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 p-8 pt-2"
    >
      <TextInput
        type="text"
        value={titulo}
        setter={setTitulo}
        title="Titulo do Leilão"
        required
      />
      <LongTextInput
        setter={setDescription}
        value={description}
        title="Descrição"
        required
      />
      <TextInput
        type="number"
        value={lanceInicial}
        setter={setLanceInicial}
        title="Valor do Lance Inicial"
        required
      />
      <TextInput
        type="text"
        value={imagem}
        setter={setImagem}
        title="Foto do Produto (URL)"
        required
      />
      <TextInput
        type="number"
        value={duracao}
        setter={setDuracao}
        title="Duração em minutos"
        required
      />
      <button
        disabled={loading}
        className="w-full bg-slate-700 rounded-2xl p-2 font-bold cursor-pointer text-slate-200 transition hover:text-slate-700 hover:bg-slate-300"
      >
        {loading ? "Criando leilão..." : "Leiloar Item"}
      </button>
    </form>
  );
};
export default FormAuctioneer;
