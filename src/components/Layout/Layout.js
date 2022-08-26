import { Layout as AntdLayout, Menu, Button } from 'antd'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { AppRoutes } from 'constants/app.routes'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
import './Layout.css'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { getAuth, onAuthStateChanged,signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const { Header, Content } = AntdLayout


export const Layout = () => {
  const { pathname } = useLocation()
  const activeRoute = pathname.split('/').pop()
  const { user_routes, admin_routes } = AppRoutes
  const user = LocalStorageHandler.user
  let navigate = useNavigate();

  const getMenuOptions = () => {
    if (!user?.role) return []
    switch (user.role) {
      case 'user':
        return [
          {
            key: user_routes.hours,
            label: (
              <>
                <Link to={`/users/${user_routes.hours}`}>Hours</Link>
              </>
            ),
          },
          {
            key: user_routes.maintenance,
            label: (
              <>
                <Link to={`/users/${user_routes.maintenance}`}>Maintenance</Link>
              </>
            ),
          }
        ]
      case 'admin':
        return [
          {
            key: admin_routes.hours,
            label: (
              <>
                <Link to={`/admin/${admin_routes.hours}`}>Hours</Link>
              </>
            ),
          },
          {
            key: admin_routes.maintenance,
            label: (
              <>
                <Link to={`/admin/${admin_routes.maintenance}`}>Maintenance</Link>
              </>
            ),
          },
          {
            key: admin_routes.users,
            label: (
              <>
                <Link to={`/admin/${admin_routes.users}`}>Add Users</Link>
              </>
            )

          }
        ]
    }
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      logout()
    }
  });
  
  const logout =()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      LocalStorageHandler.clearToken()
      navigate("/login", { replace: true });
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <AntdLayout>
      <Header>
        {LocalStorageHandler.token && (
          <Button
            type="primary"
            style={{
              float: 'right',
              transform: 'translateY(18px)',
            }}
            size="large"
          >
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </Button>
        )}
        <Menu
          activeKey={activeRoute}
          theme="dark"
          mode="horizontal"
          items={getMenuOptions()}
        />

      </Header>
      <Content className="app-main-content">
        {/* <StudentContextProvider>
          <LibrarianContextProvider> */}
        <Outlet />
        {/* </LibrarianContextProvider>
        </StudentContextProvider> */}
      </Content>
    </AntdLayout>
  )
}
