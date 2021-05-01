import React, {Suspense} from 'react';
import "./App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'element-theme-default';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/login" component={React.lazy(() => import('./pages/Login/Login'))} />
          <Route exact path="/firmware-upload" component={React.lazy(() => import('./pages/FirmwareUpload/FirmwareUpload'))} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
