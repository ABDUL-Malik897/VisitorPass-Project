import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VisitorContextProvider } from './Context/VisitorContext';
import { AuthContextProvider } from './Context/AuthContext';
import { ComplaintContextProvider } from './Context/ComplaintContext';
import { EmployeeContextProvider } from "./Context/EmployeeContext";
// import { ThemeContextProvider } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
      <VisitorContextProvider>
        <ComplaintContextProvider>
          <EmployeeContextProvider>
            <App />
          </EmployeeContextProvider>
        </ComplaintContextProvider>
      </VisitorContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


