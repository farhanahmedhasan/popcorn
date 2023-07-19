export default function ButtonToggle({isOpen, onClick}) {
    return(
        <button
            className="btn-toggle"
            onClick={onClick}
        >
            {isOpen ? "–" : "+"}
        </button>
    )
}