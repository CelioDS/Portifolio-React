import Container from "../Item-Layout/Container";
import RenameTitle from "../Tools/RenameTitle";
import style from "./Projetos.module.css";
import { toast } from "react-toastify";

import { BsLink, BsHandThumbsUp } from "react-icons/bs";
import { useLayoutEffect, useState } from "react";

export default function Projetos() {
  const [DataBase, setDataBase] = useState(null);

  const GetDataBase = async () => {
    try {
      const url =
        process.env.REACT_APP_API_URL || "http://localhost:5000/Projetos";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      toast.success("Dados carregados com sucesso!");
      setDataBase(data);
    } catch (error) {
      toast.error("Erro na base de dados!");
    }
  };

  useLayoutEffect(() => {
    GetDataBase();
  }, [setDataBase]);
  const setLike = async (id) => {
    try {
      // 1. Busca o projeto pelo ID
      const projetoResponse = await fetch(
        `http://localhost:5000/Projetos/${id}`
      );
      if (!projetoResponse.ok) {
        // Se a resposta não for bem-sucedida, lança um erro
        throw new Error("Erro ao buscar o projeto.");
      }

      // 2. Converte a resposta em JSON para obter os dados do projeto
      const projeto = await projetoResponse.json();

      // 3. Incrementa o valor de "like" do projeto
      const updatedLike = projeto.like + 1;

      // 4. Atualiza o valor de "like" no backend usando o método PATCH
      const updateResponse = await fetch(
        `http://localhost:5000/Projetos/${id}`,
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
          <p>Aqui esta alguns do meu projetos.</p>
        </header>

        <section>
          {DataBase &&
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
                        src="arquivos/foto.jpeg"
                        alt="foto perfil"
                        title="foto perfil"
                      />
                    </aside>

                    <aside>
                      <h2>{nome}</h2>
                      <p>Desenvolver FrontEnd | ReactJs | Analista de dados</p>
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
                      onClick={() => {
                        setLike(id);
                      }}
                    >
                      Gostei &nbsp; <BsHandThumbsUp />
                    </button>
                    <aside>
                      <BsHandThumbsUp /> {like}
                    </aside>
                  </footer>
                </article>
              )
            )}

          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7278417019144667136"
            height="605"
            width="504"
            frameborder="0"
            allowfullscreen=""
            title="Publicação incorporada"
          ></iframe>
        </section>
      </main>
    </Container>
  );
}
