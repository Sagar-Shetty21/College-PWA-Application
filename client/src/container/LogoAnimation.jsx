import React, {useState, useEffect} from 'react';
import './LogoAnimation.css';


const LogoAnimation = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setShow(false);
      },4500);
      setTimeout(() => {
        document.querySelector("img.logo-img").style.opacity = "0";
      },2500)
      setTimeout(() => {
        document.querySelector("#logo").style.opacity = "0";
      },3000)
    },[]);

    if(!show) return null;

    return (
      <div id="logo">
        <img src="../scc-logo.jpg" alt="logo-img" className="logo-img"></img>
        <div class="animate seven">
          <span>s</span><span>i</span><span>l</span><span>i</span><span>c</span><span>o</span><span>n</span> &nbsp;
          <span>c</span><span>i</span><span>t</span><span>y</span> &nbsp;
          <span>c</span><span>o</span><span>l</span><span>l</span><span>e</span><span>g</span><span>e</span>
		    </div>
      </div>
    );
  }

  export default LogoAnimation;




  
  // source : https://codepen.io/webstoryboy/pen/rrLdQX