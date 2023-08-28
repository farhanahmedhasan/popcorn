import {useEffect, useRef, useState} from "react";

const key = "1965cdc6"
export default function Search ({setMovies, setIsLoading, setErrorMessage}) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null)

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

        const timer = setTimeout(()=>{
            getMovies()
        },300)

        return ()=> {
            controller.abort()
            clearTimeout(timer)
        }

    }, [query])

    useEffect(()=> {
        function callback(e){
            if(document.activeElement === inputRef.current) return

            if(e.code === "Enter") {
                inputRef.current.focus()
                setQuery("")
            }
        }

        document.addEventListener('keydown', callback)

        return ()=> document.removeEventListener("keydown",callback)

    },[])

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