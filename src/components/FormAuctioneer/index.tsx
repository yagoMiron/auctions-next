"use client";
import { useState } from "react";
import TextInput from "../TextInput";
import LongTextInput from "../LongTextInput";

const FormAuctioneer = () => {
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [lanceInicial, setLanceInicial] = useState("");
  const [imagem, setImagem] = useState("");
  const [duracao, setDuracao] = useState("");
  return (
    <form className="w-full flex flex-col gap-4 p-8 pt-2">
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
      <button className="w-full bg-slate-700 rounded-2xl p-2 font-bold cursor-pointer text-slate-200 transition hover:text-slate-700 hover:bg-slate-300">
        Leiloar Item
      </button>
    </form>
  );
};
export default FormAuctioneer;
