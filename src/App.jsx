import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/Authcontext.jsx';
import './App.css'
import Todo from './pages/Todo.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (
    <>
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/signup" element={
                  <ProtectedRoute authOnly = {false}>
                      <Signup />
                  </ProtectedRoute>
                }/>
                <Route path="/login" element={
                  <ProtectedRoute authOnly = {false}>
                      <Login />
                  </ProtectedRoute>
                }/>
                <Route path="/todo" element={
                  <ProtectedRoute authOnly = {true}>
                      <Todo />
                  </ProtectedRoute>
                }/>
            </Routes>
        </Router>
    </AuthProvider>
    </>
  )
}

export default App
