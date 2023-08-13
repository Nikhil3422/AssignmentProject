import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Get from "./components/Get";
import  Posts from "./components/Posts";



function App() {

  return (
    <Router>
     
      <Routes>
        <Route  exact path="/Get" element={<Get/>}/>
        <Route path="/Posts" element={<Posts/>} />
        
       
      </Routes>
  </Router>
  )
}
export default App;
