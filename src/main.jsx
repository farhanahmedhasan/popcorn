import React from 'react'
import ReactDOM from 'react-dom/client'
import StarRating from "./components/StarRating.jsx";
// import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StarRating maxRating={10}/>
      <StarRating className="test" textColor="red" defaultRating={4}/>
      <StarRating starColor="red" size={24} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}/>
  </React.StrictMode>,
)
