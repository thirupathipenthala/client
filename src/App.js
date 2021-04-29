import React from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './components/screens/SignIn'
import SignUp from './components/screens/SignUp'
import Fotaupload from './components/screens/Fotaupload'
const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <SignIn />
      </Route>
      <Route exact path='/SignUp'>
        <SignUp />

      </Route>
      <Route exact path='/Fotaupload'>
        <Fotaupload />
      </Route>

    </Switch>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
