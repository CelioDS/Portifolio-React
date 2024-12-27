import Container from "../Item-Layout/Container";
import RenameTitle from "../Tools/RenameTitle";
import style from "./Projetos.module.css";

import { BsLink } from "react-icons/bs";

export default function Projetos() {
  return (
    <Container>
      <main className={style.main}>
        <RenameTitle initialTitle={"C&Lio - Projetos"} />
        <header>
          <h1> projetos</h1>
          <p>Aqui esta alguns do meu projetos.</p>
        </header>

        <section>
          <article>
            <header>
              <h2>Login e Cadastro de Usuário</h2>
              <p>CRUD completo para administrador.</p>
            </header>

            <h3>Tecnologias utilizadas:</h3>
            <aside>
              <ul>
                <li>Sql</li>
                <li>Sweetalert2</li>
                <li>Javascript</li>
                <li>Viacep</li>
                <li>Html</li>
                <li>Php</li>
                <li>Css</li>
              </ul>
              <a
                href="https://github.com/CelioDS/Projetos-PHP/tree/main/loginBanco"
                target="_blank"
                rel="noopener noreferrer"
                title="Veja o repositorio no GitHub"
                class="project-link"
              >
                <p>Link GitHub </p>
                <BsLink size={24} />
              </a>
            </aside>

            <img
              src="https://celiotech.netlify.app/img/bancodedados_1_11zon.webp"
              alt="Interface do projeto de login e cadastro"
            />
          </article>
        </section>
      </main>
    </Container>
  );
}
