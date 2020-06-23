import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from './store/actions/actions'
import AuthenticatedApp from './authenticated'
import AuthHandler from './components/AuthHandler'
import NonAuthenticatedApp from './nonAuthenticated'
import useUser from './utils/customHooks/useUser'
// needed for styling that has not been changed yet
import './App.css'
import './styles/sass/index.sass'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useUser()

  useEffect(() => {
    dispatch(saveAllPosts())
    dispatch(saveCurrentUser())
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch])

  const renderApp = currentUser ? <AuthenticatedApp /> : <NonAuthenticatedApp />

  return (
    <Router>
      <div data-testid="app-main">
        {renderApp}
        <Route path="/auth">
          <AuthHandler />
        </Route>
      </div>
    </Router>
  )
}

export default App
