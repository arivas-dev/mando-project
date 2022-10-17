export const AppRoutes = {
    user_routes: {
      base: 'users',
      hours: 'hours',
      maintenance : 'maintenance'
    },
    admin_routes: {
      base: 'admin',
      hours: 'hours',
      users: 'users-creation',
      maintenance: 'maintenance'
    },
    admin_users_routes:{
      base: 'admin_users',
      users: 'users-creation'
    },
    admin_hours_routes : {
      base: 'admin_hours',
      hours: 'hours'
    },
    admin_maintenance_routes : {
      base: 'admin_maintenance',
      maintenance: 'maintenance'
    },
    login: 'login',
    notFound: '*',
  }