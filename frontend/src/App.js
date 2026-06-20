import { BrowserRouter , Routes , Route, Navigate} from "react-router-dom";
// import './App.css';
import Navbar from "./Components/Navbar";
import Section from "./pages/Section";
import Footer from "./Components/Footer";
import Login from "./Authen/Login";
import Signup from "./Authen/Signup";
import Dashboard from "./Components/dashboard";
import { useAuthContext } from "./Hooks/useAuthContext";
import Complains from "./Components/Complaint";
import ComplaintDashboard from "./Components/ComplaintDashboard";
import UserLayout from "./pages/UserLayout";
import { useState } from "react";
import Admin from "./pages/Admin";
import Report from "./Components/Report";
import QrForm from "./QrEntry/QrForm";



function App() {

  const {user} = useAuthContext()
  const [showProfile, setShowProfile] = useState(false)

  return (
    
    <div className="App">
      <BrowserRouter>

      <Navbar setShowProfile={setShowProfile}/>      
      <div className="pages">
        <Routes>
          <Route path="/" element={
            !user ? (
              <Section />
            ) : user.role === "admin" ? (
              <Navigate to="/admin" replace/>
            ) : (
              <Navigate to="/userlayout" replace/>
            )
          }/>

          <Route path="/login" element={
            !user ? 
              (<Login/>) 
                : 
              user.role === "admin" ? (
              <Navigate to="/admin" replace/>
            ) : (
              <Navigate to="/userlayout" replace/>
            )
          }/>

          <Route path="/signup" element={
            !user ? 
              (<Signup />) 
                : 
              (<Navigate to="/" replace/>)
          }/>

            <Route
              path="/userlayout"
              element={
                user && user.role !== "admin" ? (
                  <UserLayout 
                    showProfile={showProfile}
                    setShowProfile={setShowProfile}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/form" element={
                user && user.role !== "admin" ? (
                  <QrForm />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/complaints" element={
                user ? (
                  <Complains />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />


            <Route path="/dashboard" element={
                user?.role === "admin" ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            

            <Route
              path="/admin"
              element={
                user && user.role === "admin" ? (
                  <Admin 
                    showProfile={showProfile}
                    setShowProfile={setShowProfile}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/complaint-dashboard" element={
                user?.role === "admin" ? (
                  <ComplaintDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/reports" element={
                user?.role === "admin" ? (
                  <Report />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
