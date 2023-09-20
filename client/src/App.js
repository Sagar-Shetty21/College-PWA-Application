import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Include all icons
import {React} from 'react';
import { Route, Routes } from 'react-router-dom';
import LogoAnimation from './utils/LogoAnimation';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/global/Layout';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Queries from './pages/Queries';
import CreateQueries from './components/queries/CreateQuery';
import RequireAuth from './utils/RequireAuth';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ChatInterface from './components/studyChat/ChatInterface';
import AllContacts from './components/studyChat/AllContacts';
import AllContactsForGroup from './components/studyChat/AllContactsForGroup';

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
            <Route path="/queries/create" element={<Layout><CreateQueries/></Layout>}/>
            <Route path="/profile" element={<Layout><Profile/></Layout>}/>
            <Route path="/chat" element={<Layout><Chat/></Layout>}/>
            <Route path="/chat/:id" element={<Layout><ChatInterface/></Layout>}/>
            <Route path="/chat/availablecontacts" element={<Layout><AllContacts/></Layout>}/>
            <Route path="/chat/availablecontactsforgroup" element={<Layout><AllContactsForGroup/></Layout>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
