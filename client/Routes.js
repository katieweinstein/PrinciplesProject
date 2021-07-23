import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Dog from './Dog';

/* This simple single-page application only consists of two components:
Home and Dog. The default route is Home, which creates links to individual Dog
components based on breed. */

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
