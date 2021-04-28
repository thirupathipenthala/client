import React from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route } from 'react-router-dom'
import SignIn from './components/screens/SignIn'
import SignUp from './components/screens/SignUp'
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
    </BrowserRouter>
  );
}

export default App;
