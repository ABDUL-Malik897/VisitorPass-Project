import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VisitorContextProvider } from './Context/VisitorContext';
import { AuthContextProvider } from './Context/AuthContext';
import { ComplaintContextProvider } from './Context/ComplaintContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ComplaintContextProvider>
      <AuthContextProvider>
        <VisitorContextProvider>
          <App />
        </VisitorContextProvider>
      </AuthContextProvider>
    </ComplaintContextProvider>
  </React.StrictMode>
);


