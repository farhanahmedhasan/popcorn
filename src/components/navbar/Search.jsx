import {useEffect, useState} from "react";

const key = "1965cdc6"
export default function Search ({setMovies, setIsLoading}) {
    const [query, setQuery] = useState("");

    useEffect(()=> {
        async function getMovies(){
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${key}`)
            const data = await res.json()
            setMovies(data.Search)
            setIsLoading(false)
            console.log(data.Search)
        }

        getMovies()

    }, [query])

    return(
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}