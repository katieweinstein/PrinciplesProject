import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Dog from './Dog';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:id" component={Dog} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
