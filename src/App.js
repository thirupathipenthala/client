import React, {Suspense} from 'react';
import "./App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'element-theme-default';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en'

i18n.use(locale);
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
