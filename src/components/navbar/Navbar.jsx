import NumResults from "./NumResults.jsx";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";

export default function Navbar({movies}) {
    return(
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NumResults movies={movies}/>
        </nav>
    )
}