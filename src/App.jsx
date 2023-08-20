import {useEffect, useState} from "react";
import Main from "./components/main/Main";
import Logo from "./components/navbar/Logo";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/navbar/Search";
import MoviesBox from "./components/main/MoviesBox";
import NumResults from "./components/navbar/NumResults";
import WatchedMoviesList from "./components/main/WatchedMoviesList";
import SearchedMovieLists from "./components/main/SearchedMovieLists";
import WatchedMoviesSummary from "./components/main/WatchedMoviesSummary";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";



export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    return (
        <>
            <Navbar>
                <Logo />
                <Search setMovies={setMovies} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage}/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <MoviesBox>
                    {(!isLoading && !errorMessage) && <SearchedMovieLists movies={movies}/>}
                    {isLoading && <Loader />}
                    {(errorMessage && !isLoading) && <ErrorMessage message={errorMessage} />}
                </MoviesBox>
                <MoviesBox>
                    <WatchedMoviesSummary watched={watched}/>
                    <WatchedMoviesList watched={watched}/>
                </MoviesBox>
            </Main>
        </>
    );
}