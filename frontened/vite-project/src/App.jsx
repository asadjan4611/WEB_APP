import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { LoginPage,SignUpPage  } from "./Routes";
import "./App.css"
function App() {


  return (
  
   <BrowserRouter>
   <Routes>
    <Route path ='/login' element ={<LoginPage/>}/>
    <Route path ='/sign-up' element ={<SignUpPage/>}/>
   
   </Routes>
   </BrowserRouter>
  )
}

export default App
