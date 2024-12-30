import { useEffect, useState } from "react";
import loading from "../img/loading.svg";
import style from "./Loading.module.css";

export default function Loading() {
  const [TextoLoading, setTextoLoading] = useState("Carregando dados...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextoLoading("ERRO : Falha ao carregar os dados... ");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={style.main}>
      <img src={loading} alt="loading" />
      <p>
        <small>{TextoLoading}</small>
      </p>
    </main>
  );
}
