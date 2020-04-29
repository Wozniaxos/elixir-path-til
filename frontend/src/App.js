import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from './store/actions/actions'
import AuthenticatedApp from './authenticated'
import AuthHandler from './components/AuthHandler'
import dark from './styles/themes/dark'
import light from './styles/themes/light'
import GlobalStyle from './styles/GlobalStyle'
import NonAuthenticatedApp from './nonAuthenticated'
import useUser from './utils/customHooks/useUser'
import { ThemeProvider } from 'styled-components'
// needed for styling that has not been changed yet
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useUser()
  const isDark = useSelector(state => state.isDark)

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
        <ThemeProvider theme={isDark ? dark : light}>
          <GlobalStyle />
          {renderApp}
          <Route path="/auth">
            <AuthHandler />
          </Route>
        </ThemeProvider>
      </div>
    </Router>
  )
}

export default App
