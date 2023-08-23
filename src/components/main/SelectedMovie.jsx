import {useEffect, useState} from "react";
import StarRating from "../StarRating.jsx";
import Loader from "../Loader.jsx";

const key = "1965cdc6"
export default function SelectedMovie({selectedId, onCloseMovie}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {Poster:poster, Title:title, Released:released, Runtime:runtime, Genre:genre, imdbRating, Plot:plot, Actors: actors, Director:director} = movie

    useEffect(()=>{
        async function fetchSingleMovie() {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${key}`)
            const movie = await res.json()
            setMovie(movie)
            setIsLoading(false)
        }
        fetchSingleMovie()
    },[selectedId])
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
                            <StarRating maxRating={10} size={24}/>
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