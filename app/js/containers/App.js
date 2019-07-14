import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Collection from './Collection';
// import {store} from '../store';

// import {getMeta} from '../redux/actions';

// store.dispatch(getMeta());

export default class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path="/:locale" component={Collection} />
            <Route path="" component={Collection} />
          </Switch>
        </div>
      </div>
    );
  }
}
