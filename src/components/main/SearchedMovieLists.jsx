import SearchedMovie from "./SearchedMovie.jsx";

export default function SearchedMovieLists({movies}) {
    return(
        <ul className="list">
            {movies?.map((movie) => (
                <SearchedMovie key={movie.imdbID} movie={movie}/>
            ))}
        </ul>
    )
}