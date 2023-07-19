import {useState} from "react";
import SearchedMovieLists from "./SearchedMovieLists.jsx";
import ButtonToggle from "../ButtonToggle.jsx";

export default function SearchedMoviesBox({movies}) {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className="box">
            <ButtonToggle isOpen={isOpen} onClick={() => setIsOpen((open) => !open)}/>
            {isOpen && <SearchedMovieLists movies={movies}/>}
        </div>
    )
}