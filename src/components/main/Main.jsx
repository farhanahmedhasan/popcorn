import SearchedMoviesBox from "./SearchedMoviesBox.jsx";
import WatchedMoviesBox from "./WatchedMoviesBox.jsx";

export default function Main({movies}) {
    return(
        <main className="main">
            <SearchedMoviesBox movies={movies}/>
            <WatchedMoviesBox />
        </main>
    )
}