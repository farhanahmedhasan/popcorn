import {useEffect, useState} from "react";

const key = "1965cdc6"
export default function Search ({setMovies, setIsLoading, setErrorMessage}) {
    const [query, setQuery] = useState("Guardians");

    useEffect(()=> {

        if(query.length < 3) {
            setMovies([])
            setErrorMessage("Type atleast 3 character to fetch movies")
            return
        }

        async function getMovies(){
            setIsLoading(true)
            setErrorMessage("")
            try {
                const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${key}`)
                if(!res.ok) throw new Error("Something went wrong with fetching the movies")

                const data = await res.json()
                if (data.Response === "False") {
                    setMovies([])
                    throw new Error("Movie not found")
                }

                setMovies(data.Search)
            }catch (err) {
                setErrorMessage(err.message)
            } finally {
                setIsLoading(false)
            }

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