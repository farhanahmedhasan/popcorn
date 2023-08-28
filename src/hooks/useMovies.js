import {useEffect, useState} from "react";

const key = "1965cdc6"
export default function useMovies(query, callback) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(()=> {
        callback?.()

        if(query.length < 3) {
            setData([])
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
                    setData([])
                    throw new Error("Movie not found")
                }

                setData(data.Search)
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

    },[query])


    return {data,isLoading,errorMessage}
}