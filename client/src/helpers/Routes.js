import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../helpers/AuthContext'

export const AuthenticatedRoute = (props) => {
  // TODO: redirPath as qs
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => isAuthenticated ? <Route {...props} /> : <Redirect to={`/login`} />}
    </AuthContext.Consumer>
  )
}
