import './App.css';
import {React} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoAnimation from './utils/LogoAnimation';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/global/Layout';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Queries from './pages/Queries';
import CreateQueries from './pages/CreateQuery';
import RequireAuth from './utils/RequireAuth';
import Profile from './pages/Profile';
import Forms from './pages/Forms';
import Notes from './pages/Notes';
import Chat from './pages/Chat';

function App() {


  return (
      <div className="App">
        <LogoAnimation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<div>Reset Password Page(not yet finished)</div>} />
          <Route element={<RequireAuth/>}>
            <Route path="/" element={<Layout><Home/></Layout>}/>
            <Route path="/home" element={<Layout><Home/></Layout>}/>
            <Route path="/campus_news" element={<Layout><Notifications/></Layout>}/>
            <Route path="/queries" element={<Layout><Queries/></Layout>}/>
            <Route path="/create_query" element={<Layout><CreateQueries/></Layout>}/>
            <Route path="/profile" element={<Layout><Profile/></Layout>}/>
            <Route path="/notes" element={<Layout><Notes/></Layout>}/>
            <Route path="/forms" element={<Layout><Forms/></Layout>}/>
            <Route path="/chat" element={<Layout><Chat/></Layout>}/>
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
