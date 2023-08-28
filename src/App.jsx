import WatchedMoviesSummary from "./components/main/WatchedMoviesSummary";
import SearchedMovieLists from "./components/main/SearchedMovieLists";
import WatchedMoviesList from "./components/main/WatchedMoviesList";
import SelectedMovie from "./components/main/SelectedMovie.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import ErrorMessage from "./components/ErrorMessage.jsx";
import NumResults from "./components/navbar/NumResults";
import MoviesBox from "./components/main/MoviesBox";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/navbar/Search";
import Loader from "./components/Loader.jsx";
import Logo from "./components/navbar/Logo";
import Main from "./components/main/Main";
import {useState} from "react";
import useMovies from "./hooks/useMovies.js";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null)

    const [data,setData] = useLocalStorage("watchedMovie", [])
    const {data: movies, isLoading, errorMessage} = useMovies(query);

    function handleSelectMovie(id) {
        setSelectedId(prev => prev === id ? null : id)
    }

    function handleCloseMovie(){
        setSelectedId(null)
    }

    function getWatchedMovieStats() {
        const alreadyWatchedMovie = data.find(movie => movie.imdbID === selectedId)
        const isAlreadyWatched = !!alreadyWatchedMovie;

        const alreadyWatchedMovieRating = alreadyWatchedMovie?.userRating

        return [isAlreadyWatched, alreadyWatchedMovieRating]
    }

    function handleAddWatch(movie){
        setData(movies=> [...movies, movie])
    }

    function handleRemoveWatch(id){
        setData(watched=> watched.filter(movie=> movie.imdbID !== id))
    }

    return (
        <>
            <Navbar>
                <Logo />
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <MoviesBox>
                    {(!isLoading && !errorMessage) && <SearchedMovieLists movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {isLoading && <Loader />}
                    {(errorMessage && !isLoading) && <ErrorMessage message={errorMessage} />}
                </MoviesBox>
                <MoviesBox>
                    {selectedId ?
                        <SelectedMovie
                            selectedId={selectedId}
                            getWatchedMovieStats={getWatchedMovieStats}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatch}
                        />
                        :
                        <>
                            <WatchedMoviesSummary watched={data}/>
                            <WatchedMoviesList watched={data} onRemoveWatched={handleRemoveWatch}/>
                        </>
                    }
                </MoviesBox>
            </Main>
        </>
    );
}