export default function SelectedMovie({selectedId, onCloseMovie}) {
    return(
        <div className="details">
            {selectedId}
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        </div>
    )
}