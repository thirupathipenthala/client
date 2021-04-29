import React from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route } from 'react-router-dom'
import SignIn from './components/screens/SignIn'
import SignUp from './components/screens/SignUp'
import Fotaupload from './components/screens/Fotaupload'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path='/'>
        <SignIn />
      </Route>
      <Route exact path='/SignUp'>
        <SignUp />

      </Route>
      <Route exact path='/Fotaupload'>
        <Fotaupload />
      </Route>
    </BrowserRouter>
  );
}

export default App;
