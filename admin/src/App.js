import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Layout from './components/globals/Layout';
import Dashboard from './pages/Dashboard';
import RequireAuth from './utils/RequireAuth';
import Notification from './pages/Notification';
import Event from './pages/Event';
import Update from './pages/Update';
import AddStaff from './pages/AddStaff';
import RemoveStaff from './pages/RemoveStaff';
import EditStaff from './pages/EditStaff';
import AddStudent from './pages/AddStudent';
import RemoveStudent from './pages/RemoveStudent';
import EditStudent from './pages/EditStudent';
import ActiveQueries from './pages/ActiveQueries';
import ResolvedQueries from './pages/ResolvedQueries';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<Layout><Dashboard/></Layout>}/>
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
          <Route path="/post/notification" element={<Layout><Notification/></Layout>}/>
          <Route path="/post/event" element={<Layout><Event/></Layout>}/>
          <Route path="/post/update" element={<Layout><Update/></Layout>}/>
          <Route path="/addStaff" element={<Layout><AddStaff/></Layout>}/>
          <Route path="/removeStaff" element={<Layout><RemoveStaff/></Layout>}/>
          <Route path="/editStaff" element={<Layout><EditStaff/></Layout>}/>
          <Route path="/addStudent" element={<Layout><AddStudent/></Layout>}/>
          <Route path="/removeStudent" element={<Layout><RemoveStudent/></Layout>}/>
          <Route path="/editStudent" element={<Layout><EditStudent/></Layout>}/>
          <Route path="/activeQueries" element={<Layout><ActiveQueries/></Layout>}/>
          <Route path="/resolvedQueries" element={<Layout><ResolvedQueries/></Layout>}/>
        </Route>
      </Routes>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
