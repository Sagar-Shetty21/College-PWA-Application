import React from 'react'
import QuoteBox from '../components/QuoteBox';
import './home.css';

const Home = () => {
  return (
    <>
      <div className="clg-card">
        <div className="logo-title">
          <img className="clg-logo" src="../scc-logo-nobg.png" alt="clg-logo" />
          <a href="https://www.siliconcitycollege.ac.in/" target="_blank"><span className="clg-name">SILICON CITY COLLEGE</span></a><br/>
        </div>
        <div>
          <span className="desc">(A Unit of MJ Education Trust)</span><br/>
          <span className="desc-2">An Autonomous Institution</span><br/>
          <span className="sub-desc">Re-Accredited by NAAC with 'A' Grade</span><br/>
          <span className="sub-desc-2">Recognised by UGC under section 2(f) & 12(b), Affiliated to Bengaluru North University</span><br/>
        </div>
      </div>
      <hr/>
      <QuoteBox/>
    </>
  )
}

export default Home