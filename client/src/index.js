import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import LoadingScreen from './utils/LoadingScreen';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { SharedStateProvider } from './context/sharedStateContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<LoadingScreen />);

window.addEventListener('load', () => {
  root.render(
    <React.StrictMode>
      <AuthProvider>
      <SharedStateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SharedStateProvider>
      </AuthProvider>
    </React.StrictMode>
  );
})



