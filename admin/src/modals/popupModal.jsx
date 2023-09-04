import React from 'react'
import ReactDom from 'react-dom'



const PopupModal = ({ toggleActive, bg, active, children }) => {
  if(!active) return null;

  const overlay = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,.8)",
    zIndex: "999"
}
const container = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    padding: "5px",
    backgroundColor: bg,
    zIndex: "1000",
    borderRadius: "6px"
}
const closeBtn = {
    fontSize: "36px",
    color: "orangered",
    margin: "8px"
}
const header = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "right"
}
const body = {
    textAlign: "center",
    padding: "24px"
}

  return ReactDom.createPortal(
    <div style={overlay}>
    <div style={container}>
        <div style={header}>
            <i className="fa-solid fa-rectangle-xmark" style={closeBtn} onClick={() => toggleActive(({active: false, prompt: ""}))}></i>
        </div>
        <div style={body}>
            {children}
        </div>
    </div>
    </div>,
    document.getElementById("portal")
  )
}

export default PopupModal