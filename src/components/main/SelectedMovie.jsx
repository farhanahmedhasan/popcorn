import {useEffect, useState} from "react";
import StarRating from "../StarRating.jsx";
import Loader from "../Loader.jsx";

const key = "1965cdc6"
export default function SelectedMovie({selectedId, onCloseMovie, onAddWatched, getWatchedMovieStats}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState("")

    const [isAlreadyWatched, alreadyWatchedMovieRating] = getWatchedMovieStats()

    const {Poster:poster, Title:title, Released:released, Runtime:runtime, Genre:genre, imdbRating, Plot:plot, Actors: actors, Director:director, Year:year} = movie

    function handleAdd(){
        if (isAlreadyWatched) return
        const newWatchedMovie = {
            imdbID : selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating,
            runtime : Number(runtime.split(" ").at(0))
        }
        onAddWatched(newWatchedMovie)
        onCloseMovie()
    }

    useEffect(()=>{
        async function fetchSingleMovie() {
            setIsLoading(true)
            try {
                const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${key}`)
                const movie = await res.json()
                setMovie(movie)
            }catch (err){
                console.log(err)
            }finally {
                setIsLoading(false)
            }
        }
        fetchSingleMovie()

    },[selectedId])

    useEffect(()=> {
        if(!title) return
        document.title = `Movie: ${title}`

        return ()=> {
            document.title = "usePopcorn"
        }
    },[title,selectedId])

    useEffect(()=> {
        const callback = (e)=> {
            if(e.code === "Escape") onCloseMovie()
        }

        document.addEventListener('keydown', callback)

        return ()=> document.removeEventListener('keydown', callback)
    },[onCloseMovie])

    return(
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`poster of ${title} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDb Rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {isAlreadyWatched ?
                                <p>You rated this movie {alreadyWatchedMovieRating} ⭐</p>

                                :
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                                    {userRating && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                                </>

                            }
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )
}