import React from 'react'
import { Route, Switch } from 'react-router-dom';
import UsersAdmin from './UsersAdmin';
import EventsAdmin from './EventsAdmin';

export default () => {
  return (
    <Switch>
        <Route path="/admin/users" component={UsersAdmin} />
        <Route path="/admin/events" component={EventsAdmin} />
    </Switch>
  )
}
