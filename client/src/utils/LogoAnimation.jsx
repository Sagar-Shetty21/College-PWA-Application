import React, {useState, useEffect} from 'react';
import './LogoAnimation.css';


const LogoAnimation = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
      const shouldShowSplashScreen = sessionStorage.getItem('showSplashScreen');

      if (!shouldShowSplashScreen) {
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem('showSplashScreen', 'true');
        },3500);
  
        const revealText = document.querySelector(".reveal");
        let letters = revealText.textContent.split("");
        revealText.textContent = "";
        let middle = letters.filter(e => e !== " ").length / 2;
        letters.forEach((letter, i) => {
          let span = document.createElement("span");
          span.textContent = letter;
          span.style.animationDelay = `${0.3 + Math.abs(i - middle) * 0.1}s`;
          revealText.append(span);
        });
      }else {
        // If the flag exists, hide the splash screen immediately
        setShow(false);
      }

      
    },[]);

    if(!show) return null;

    

    return (
      <div id="logo">
        <span className="word1">
          <p className="split">SILICON</p>
          <p className="split">SILICON</p>
        </span>
        <span className="word2">
          <div className="reveal">CAMPUS</div>
        </span>
      </div>
    );
  }

  export default LogoAnimation;




  
  // source : https://codepen.io/webstoryboy/pen/rrLdQX