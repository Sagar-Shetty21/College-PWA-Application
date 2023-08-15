import React, {useState,useEffect} from 'react'
import './dashboard.css';
import PopupModal from '../modals/popupModal';

const Dashboard = () => {

  var [data,setData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin-dashboard/get_details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const temp = await response.json();
        setData(temp)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(!active);
  }

  return (
    <div className="container">
      <div className="card ">
        Number of staffs in database<br/>
        <span>{data.totalStaffs}</span>
      </div>
      <div className="card ">
        Registered staffs<br/>
        <span>{data.registeredStaffs}</span>
      </div>
      <div className="card ">
        Number of students in database<br/>
        <span>{data.totalStudents}</span>
      </div>
      <div className="card ">
        Registered students<br/>
        <span>{data.registeredStudents}</span>
      </div>
      {active ? <PopupModal active bg="grey" toggleActive={handleClick}>
        <h1>Welcome Back Admin!</h1>
      </PopupModal>:null}
    </div>
  )
}

export default Dashboard