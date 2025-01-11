import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import InvoiceForm from './components/InvoiceForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/invoice/:id?" component={InvoiceForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

