import React, { useEffect, useState } from 'react';
import './QuoteBox.css';

const QuoteBox = () => {

  const [quote, setQuote] = useState({})

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setQuote(data[Math.floor(Math.random() * 1642) + 1]);
      });
  },[])

  return (
    <div class="card">
      <blockquote>
        <p>{quote.text}</p>
      </blockquote>
      <h3 class="name">{quote.author}</h3>
    </div>
  )
}

export default QuoteBox