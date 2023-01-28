import './App.css';
import {React, useState} from 'react';
import LogoAnimation from './container/LogoAnimation';
import LoadingScreen from './container/LoadingScreen';
import Login from './container/Login';


function App() {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <LogoAnimation />
      {isLoading?<LoadingScreen />:<></>}
      <Login />
    </div>
  );
}

export default App;
