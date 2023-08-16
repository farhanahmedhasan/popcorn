import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import StarRating from "./components/StarRating.jsx";
// import App from './App.jsx'
import './index.css'

function Test(){
    const [movieRating, setMovieRating] = useState(0)

    function handleRate(rate){
        setMovieRating(rate)
    }

    return <div>
        <StarRating maxRating={10} starColor="blue" onSetRating={handleRate}/>
        <p>This movie was rated {movieRating}</p>
    </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StarRating maxRating={10}/>
      <StarRating className="test" textColor="red" defaultRating={4}/>
      <StarRating starColor="red" size={24} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}/>
      <Test />
  </React.StrictMode>,
)
