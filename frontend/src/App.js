import Navbar from "./components/Navbar";
import Check from "./pages/Check";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CreateAttendance from "./pages/CreateAttendance";
import Addstudent from "./pages/Addstudent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route
              path="/signup"
              element={!user ? <Singup /> : <Navigate to="/" />} 
            />
            <Route
              path="/Check"
              element={user ? <Check /> : <Navigate to="/login" />}
            />
            <Route
              path="/Attendance"
              element={user ? <CreateAttendance /> : <Navigate to="/login" />}
            />
            <Route
              path="/AddStudent"
              element={user ? <Addstudent /> : <Navigate to="/login" />}
            />

          </Routes>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
