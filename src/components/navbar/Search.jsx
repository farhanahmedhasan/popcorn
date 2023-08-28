import {useRef} from "react";
import useKeyPress from "../../hooks/useKeyPress.js";

export default function Search ({query, setQuery}) {
    const inputRef = useRef(null)
    useKeyPress("Enter", function () {
        if(document.activeElement === inputRef.current) return
        inputRef.current.focus()
        setQuery("")
    });

    return(
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}