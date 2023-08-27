import React, { useEffect, useState } from 'react';
import './QuoteBox.css';

const QuoteBox = () => {

  const [quote, setQuote] = useState({})

  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setQuote(data[0]);
      });
  },[])

  return (
    <div className="quote-card">
      <blockquote>
        <p>{quote.q}</p>
      </blockquote>
      <h3 class="name">{quote.a}</h3>
    </div>
  )
}

export default QuoteBox