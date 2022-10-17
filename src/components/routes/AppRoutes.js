import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { Layout } from 'components/Layout'
import { PrivateRoute } from './PrivateRoute'
import { AppRoutes as AppRoutesObj } from 'constants/app.routes'
import { lazy } from 'react'





const LoginPage = lazy(() => import('pages/login/Login'))

const NotFoundPage = lazy(() => import('pages/NotFound/NotFound'))

const HoursPage = lazy(() => import('pages/Hours/Hours'))

const MaintenancePage = lazy(() => import('pages/Maintenance/Maintenance'))

const HourResults = lazy(() => import('pages/HourResults/HourResults'))

const MaintenanceResults = lazy(() => import('pages/MaintenanceResults/MaintenanceResults'))

const Users = lazy(() => import('pages/Users/Users'))

export const AppRoutes = () => {
    const { user_routes, login, notFound, admin_routes,admin_users_routes,admin_hours_routes,admin_maintenance_routes } = AppRoutesObj

    const renderUserRoutes = () => (
        <Route path={user_routes.base} element={<Layout />}>
            <Route
                index
                element={
                    <PrivateRoute>
                        <Navigate to={user_routes.hours} replace />
                    </PrivateRoute>
                }
            />

            <Route path={user_routes.hours}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <HoursPage />
                        </PrivateRoute>
                    }
                />
            </Route>
            <Route path={user_routes.maintenance}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <MaintenancePage />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Route>
    )

    const renderAdminRoutes = () => (
        <Route path={admin_routes.base} element={<Layout />}>
            <Route
                index
                element={
                    <PrivateRoute>
                        <Navigate to={admin_routes.hours} replace />
                    </PrivateRoute>
                }
            />

            <Route path={admin_routes.hours}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <HourResults />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route path={admin_routes.maintenance}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <MaintenanceResults />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route path={admin_routes.users}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Route>
    )

    const renderAdminUsersRoutes = () => (
        <Route path={admin_users_routes.base} element={<Layout />}>
            <Route
                index
                element={
                    <PrivateRoute>
                        <Navigate to={admin_users_routes.users} replace />
                    </PrivateRoute>
                }
            />

            <Route path={admin_users_routes.users}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Route>
    )

    const renderAdminHoursRoutes = () => (
        <Route path={admin_hours_routes.base} element={<Layout />}>
            <Route
                index
                element={
                    <PrivateRoute>
                        <Navigate to={admin_hours_routes.hours} replace />
                    </PrivateRoute>
                }
            />

            <Route path={admin_hours_routes.hours}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <HourResults />
                        </PrivateRoute>
                    }
                />
            </Route>


        </Route>
    )

    const renderAdminMaintenanceRoutes = () => (
        <Route path={admin_maintenance_routes.base} element={<Layout />}>
            <Route
                index
                element={
                    <PrivateRoute>
                        <Navigate to={admin_maintenance_routes.maintenance} replace />
                    </PrivateRoute>
                }
            />


            <Route path={admin_maintenance_routes.maintenance}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <MaintenanceResults />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Route>
    )

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={login} replace />} />
                {renderUserRoutes()}
                {renderAdminRoutes()}
                {renderAdminUsersRoutes()}
                {renderAdminHoursRoutes()}
                {renderAdminMaintenanceRoutes()}
                <Route path={login} element={<LoginPage />} />
                <Route path={notFound} element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}
