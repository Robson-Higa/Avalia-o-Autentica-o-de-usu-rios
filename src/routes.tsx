import { RouteObject } from 'react-router-dom'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Logout from './pages/Logout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/create-user',
    element: <CreateUser />
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: '/logout',
    element: <Logout />
  }
]