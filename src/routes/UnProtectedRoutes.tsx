import { Navigate } from 'react-router-dom'

const UnProtectedRoutes = ({ children }: any) => {
  const authToken = localStorage.getItem('token')
  return !authToken ? children : <Navigate to="/dashboard" />
}

export default UnProtectedRoutes
