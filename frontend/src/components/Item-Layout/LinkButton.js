import { Link } from "react-router-dom";
import styleExterno from "./LinkButton.style.css"

export default function LinkButton({to,text, onClick}){
    return (
            <Link to={to} className={styleExterno ? "" : styleExterno.main} onClick={onClick}>{text}</Link>
    )
}