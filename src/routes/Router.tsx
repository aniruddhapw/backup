import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Loading from 'components/common/Loading'
import paths from 'routes/paths'
import ProtectedRoutes from 'routes/ProtectedRoutes'
import UnProtectedRoutes from 'routes/UnProtectedRoutes'

const Home = lazy(() => import('pages/Home'))

interface Routes {
  path: string
  element: React.ReactNode
}

const getRouteElement = (
  Component: React.ElementType,
  isProtected: boolean,
): React.ReactNode => (
  <Suspense fallback={<Loading />}>
    {isProtected ? (
      <ProtectedRoutes>
        <Component />
      </ProtectedRoutes>
    ) : (
      <UnProtectedRoutes>
        <Component />
      </UnProtectedRoutes>
    )}
  </Suspense>
)

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home, false) },
]

export default createBrowserRouter(routes)
