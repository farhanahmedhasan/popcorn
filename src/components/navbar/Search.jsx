import {useEffect, useState} from "react";

const key = "1965cdc6"
export default function Search ({setMovies, setIsLoading, setErrorMessage}) {
    const [query, setQuery] = useState("");

    useEffect(()=> {

        if(query.length < 3) {
            setMovies([])
            setErrorMessage("Type at least 3 character to fetch movies")
            return
        }

        const controller = new AbortController()
        const signal = controller.signal

        async function getMovies(){
            setIsLoading(true)
            setErrorMessage("")
            try {
                const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${key}`, {signal})
                if(!res.ok) throw new Error("Something went wrong with fetching the movies")

                const data = await res.json()
                if (data.Response === "False") {
                    setMovies([])
                    throw new Error("Movie not found")
                }

                setMovies(data.Search)
                setErrorMessage("")
            }catch (err) {
                if(err.name !== "AbortError"){
                    setErrorMessage(err.message)
                    console.log(err)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getMovies()

        return ()=> controller.abort()

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