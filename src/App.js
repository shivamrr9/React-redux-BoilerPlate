import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dp from './containers/Dp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Dp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
