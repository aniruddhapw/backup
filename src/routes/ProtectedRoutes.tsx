import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: any) => {
  const authenticated = localStorage.getItem('token')

  return authenticated ? children : <Navigate to="/" />
}

export default ProtectedRoutes
