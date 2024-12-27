import style from "./Container.module.css";

export default function Container({ children }) {
  return <main className={style.container}>{children}</main>;
}
