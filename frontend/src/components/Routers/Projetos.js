import Container from "../Item-Layout/Container";
import RenameTitle from "../Tools/RenameTitle";
import style from "./Projetos.module.css";
import { toast } from "react-toastify";
import LoadingSVG from "../Item-Layout/Loading";

import { BsLink, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Projetos() {
  const [DataBase, setDataBase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arrayIDLike, setArrayIDLike] = useState(
    JSON.parse(localStorage.getItem("arrayId")) || []
  );

  const GetDataBase = async () => {
    try {
      const url =
        process.env.REACT_APP_API_URL ||
        "http://localhost:5000/database" ||
        "https://raw.githubusercontent.com/CelioDS/Portifolio-React/refs/heads/main/frontend/src/components/backend/db.json";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
        toast.success("Dados carregados com sucesso!");
      }, 100);

      setDataBase(data);
    } catch (error) {
      toast.error("Erro na base de dados!");
    }
  };

  useEffect(() => {
    GetDataBase();
  }, [setDataBase]);

  useEffect(() => {
    localStorage.setItem("arrayId", JSON.stringify(arrayIDLike));
  }, [arrayIDLike]);

  const setLike = async (id) => {
    const likeTrue = localStorage.getItem(id);

    try {
      // 1. Busca o projeto pelo ID
      const projetoResponse = await fetch(
        `http://localhost:5000/database/${id}` ||
          `https://celioportifolio.netlify.app/database/${id}`
      );
      if (!projetoResponse.ok) {
        // Se a resposta não for bem-sucedida, lança um erro
        throw new Error("Erro ao buscar o projeto.");
      }

      // 2. Converte a resposta em JSON para obter os dados do projeto
      const projeto = await projetoResponse.json();

      // 3. Incrementa o valor de "like" do projeto
      localStorage.setItem(id, "true");
      let updatedLike = 0;
      if (likeTrue) {
        updatedLike = projeto.like - 1;
        localStorage.removeItem(id);
        setArrayIDLike((prevArray) => prevArray.filter((item) => item !== id));
      } else {
        updatedLike = projeto.like + 1;
      }

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Obtém a chave no índice atual
        if (key === id) {
          setArrayIDLike((prevArray) => [...prevArray, id]);
        }
      }

      // 4. Atualiza o valor de "like" no backend usando o método PATCH
      const updateResponse = await fetch(
        `http://localhost:5000/database/${id}` ||
          `https://celioportifolio.netlify.app/database/${id}`,
        {
          method: "PATCH", // Define que estamos fazendo uma atualização parcial
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          },
          body: JSON.stringify({ like: updatedLike }), // Envia o novo valor de "like"
        }
      );

      if (!updateResponse.ok) {
        // Se a atualização no backend falhar, lança um erro
        throw new Error("Erro ao atualizar o like.");
      }

      // 5. Atualiza o estado local para refletir o novo valor de "like"
      setDataBase((prev) =>
        prev.map(
          (item) =>
            // Para cada item no estado, verifica se o ID corresponde ao item atualizado
            item.id === id
              ? { ...item, like: updatedLike } // Atualiza o valor de "like" no item correspondente
              : item // Mantém os itens que não foram atualizados inalterados
        )
      );

      // toast.success("Like atualizado com sucesso!");
    } catch (error) {
      // 7. Captura e exibe qualquer erro que ocorrer durante o processo
      toast.error("Erro ao processar o like: " + error.message);
      console.error(error); // Mostra detalhes do erro no console para depuração
    }
  };

  return (
    <Container>
      <main className={style.main}>
        <RenameTitle initialTitle={"C&Lio - Projetos"} />
        <header>
          <h1> projetos</h1>
          <p>Aqui esta alguns do meus projetos.</p>
        </header>
        {loading && <LoadingSVG />}
        <section>
          {DataBase &&
            !loading &&
            DataBase.map(
              ({
                id,
                nome,
                descricao,
                repositorio,
                site,
                tecnologias,
                imagem,
                like,
              }) => (
                <article key={id}>
                  <header>
                    <aside>
                      <img
                        src="arquivos/foto.webp"
                        alt="foto perfil"
                        title="foto perfil"
                      />
                    </aside>

                    <aside>
                      <h2>{nome}</h2>
                      <p>Desenvolver FrontEnd | ReactJs | Analista De Dados</p>
                      <p>Célio Da Silva</p>
                    </aside>
                    <aside>
                      <a
                        href="https://github.com/CelioDS/Projetos-PHP/tree/main/loginBanco"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Veja o repositorio no GitHub"
                        className={style.btnlink}
                      >
                        <BsLink size={24} />
                      </a>
                    </aside>
                  </header>
                  <p>{descricao}</p>
                  <h3>Tecnologias utilizadas:</h3>
                  <aside>
                    <p>{tecnologias}</p>

                    {site.trim() !== "" && (
                      <p>
                        Hospedagem : &nbsp;
                        <a
                          href={site}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Veja o repositorio no GitHub"
                          className={style.btnlink}
                        >
                          {site}
                        </a>
                      </p>
                    )}

                    <p>
                      Repositorio : &nbsp;
                      <a
                        href={repositorio}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Veja o repositorio no GitHub"
                      >
                        {repositorio}
                      </a>
                    </p>
                  </aside>

                  <img
                    src={imagem}
                    alt="Interface do projeto de login e cadastro"
                  />

                  <footer>
                    <button
                      aria-label={
                        arrayIDLike.includes(id) ? "Descurtir" : "Curtir"
                      }
                      title={arrayIDLike.includes(id) ? "Descurtir" : "Curtir"}
                      style={{
                        background: arrayIDLike.includes(id) ? "#07083b" : "",
                        color: arrayIDLike.includes(id) ? "#b98639" : "",
                      }}
                      onClick={() => {
                        setLike(id);
                      }}
                    >
                      {arrayIDLike.includes(id) ? (
                        <BsHandThumbsUpFill
                          style={{
                            color: arrayIDLike.includes(id) ? "#b98639" : "",
                          }}
                        />
                      ) : (
                        <BsHandThumbsUp />
                      )}
                      &nbsp; &nbsp;
                      {arrayIDLike.includes(id) ? "Curtiu" : "Curtir"}
                    </button>

                    <aside
                      style={{
                        color: arrayIDLike.includes(id) ? "#b98639" : "",
                      }}
                    >
                      {arrayIDLike.includes(id) ? (
                        <BsHandThumbsUpFill
                          style={{
                            color: arrayIDLike.includes(id) ? "#b98639" : "",
                          }}
                        />
                      ) : (
                        <BsHandThumbsUp />
                      )}
                      &nbsp;
                      {like > 1 && arrayIDLike.includes(id)
                        ? `Voce e ${like - 1} ${
                            like > 2 ? "pessoas" : "pessoa"
                          } `
                        : like}
                    </aside>
                  </footer>
                </article>
              )
            )}
        </section>
      </main>
    </Container>
  );
}
