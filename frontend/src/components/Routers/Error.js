import styleExt from "./Error.module.css";

const styleInterna = {
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f1f1f1",
    },
    title: {
      fontSize: "48px",
      color: "#333",
    },
};

export default function Error() {
  return (
    <main style={styleInterna.container}>
      <h1 style={styleInterna.title} className={styleExt.titles}>
        ERROR 404
      </h1>
      <a
        href="https://celiotech.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Criado e desenvolvido por <span>C&Lio</span>
      </a>
    </main>
  );
}
