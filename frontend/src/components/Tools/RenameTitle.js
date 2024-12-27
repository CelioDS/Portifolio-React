import { useEffect } from "react";

export default function RenameTitle({ initialTitle }) {
  useEffect(() => {
    //define titulo da pagina
    document.title = initialTitle;
  }, [initialTitle]);

  return null; // O componente não renderiza nada na tela
}
