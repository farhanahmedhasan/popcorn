import {useState} from "react";
import ButtonToggle from "../ButtonToggle.jsx";

export default function MoviesBox({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className="box">
            <ButtonToggle isOpen={isOpen} onClick={() => setIsOpen((open) => !open)}/>
            {isOpen && children}
        </div>
    )
}