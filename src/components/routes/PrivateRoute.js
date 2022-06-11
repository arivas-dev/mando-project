import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app.routes'
// import { LocalStorageHandler } from 'utils/LocalStorageHandler'

export const PrivateRoute = ({ children }) => {
  return true ? (
    children
  ) : (
    <Navigate to={`/${AppRoutes.login}`} />
  )
}
