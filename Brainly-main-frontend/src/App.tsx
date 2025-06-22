import { Dashboard } from "./Pages/Dashboard";
import { Home } from "./Pages/Home";
import { SeeOthersBrain } from "./Pages/SeeOtherBrain";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";


import { BrowserRouter,Routes,Route } from "react-router-dom";


 function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/Seebrain" element={<SeeOthersBrain/>}/>

    
  </Routes>
  </BrowserRouter>
}

export default App;