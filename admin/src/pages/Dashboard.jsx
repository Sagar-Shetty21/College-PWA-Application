import React, {useState,useEffect} from 'react'
import './dashboard.css';
import PopupModal from '../modals/popupModal';

const Dashboard = () => {

  const [allStaffs, setAllStaffs] = useState(200);
  const [regStaffs, setRegStaffs] = useState(20);
  const [allStudents, setAllStudents] = useState(14);
  const [regStudents, setRegStudents] = useState(34);

  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(!active);
  }

  return (
    <div className="container">
      <div className="card ">
        <span>Number of staffs in database</span><br/>
        {allStaffs}
      </div>
      <div className="card ">
        <span>Registered staffs</span><br/>
        {regStaffs}
      </div>
      <div className="card ">
        <span>Number of students in database</span><br/>
        {allStudents}
      </div>
      <div className="card ">
        <span>Registered students</span><br/>
        {regStudents}
      </div>
      {active ? <PopupModal active bg="yellow" toggleActive={handleClick}>
        <h1>wwe</h1>
      </PopupModal>:null}
    </div>
  )
}

export default Dashboard