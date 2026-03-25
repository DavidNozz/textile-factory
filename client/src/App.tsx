import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components";
import { SignUp, SignIn, Tasks, Employees, SystemControl, Profile } from "@/pages";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" replace/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/employees" element={<Employees/>}/>
        <Route path="/system-control" element={<SystemControl/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App;
