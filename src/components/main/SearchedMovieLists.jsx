import SearchedMovie from "./SearchedMovie.jsx";

export default function SearchedMovieLists({movies, onSelectMovie}) {
    return(
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <SearchedMovie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}/>
            ))}
        </ul>
    )
}