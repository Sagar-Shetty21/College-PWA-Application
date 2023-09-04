import React, { useEffect, useState } from 'react';
import './QuoteBox.css';

const QuoteBox = () => {

  const [quote, setQuote] = useState({})

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/quotes/getQuote`);
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getQuote();
  },[])

  return (
    <div className="quote-card">
      <blockquote>
        <p>{quote.quote}</p>
      </blockquote>
      <h3 className="name">{quote.author}</h3>
    </div>
  )
}

export default QuoteBox