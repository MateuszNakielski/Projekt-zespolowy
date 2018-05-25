import React, { Component } from 'react';
import DesktopAppBar from './components/DesktopAppBar';
import MobileSideBar from './components/MobileSideBar';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';
import EventDetails from './pages/EventDetails';
import {AuthenticatedRoute} from './helpers/Routes';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <DesktopAppBar />
        <MobileSideBar />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Register} />
        <Switch>
          <AuthenticatedRoute exact path='/events/new' component={NewEvent} />
          <Route path='/events/:id' component={EventDetails} />
          <Route path='/' component={Events} />
        </Switch>
      </React.Fragment>
    )
  }
}
