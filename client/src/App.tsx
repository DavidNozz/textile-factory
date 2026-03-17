import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components";
import { SignUp, SignIn } from "@/pages";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" replace/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </>
  )
}

export default App;
