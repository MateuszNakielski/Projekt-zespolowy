import React, { Component } from 'react';
import DesktopAppBar from './components/DesktopAppBar';
import MobileSideBar from './components/MobileSideBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';
import EventDetails from './pages/EventDetails';
import { AuthenticatedRoute, AdminRoute } from './helpers/Routes';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import ConsecutiveSnackbars from './components/ConsecutiveSnackbars';
import AuthContext from './helpers/AuthContext';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <DesktopAppBar />
        <MobileSideBar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Register} />
          <AuthenticatedRoute exact path='/profile' component={Profile} />
          <AdminRoute path='/admin' component={Admin} />
          <AuthenticatedRoute exact path='/events/new' component={NewEvent} />
          <Route path='/events/:id' component={EventDetails} />
          <Route path='/events' component={Events} />
          <Redirect to='/events' />
        </Switch>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => isAuthenticated ? <ConsecutiveSnackbars /> : null}
        </AuthContext.Consumer>
      </React.Fragment>
    )
  }
}

export default Layout;